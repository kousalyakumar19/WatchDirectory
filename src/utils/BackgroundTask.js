const fs = require('fs');
const Task = require('../models/Task');
const FileChange = require('../models/FileChange');
const { Op } = require('sequelize');

function monitorDirectory(directoryPath, interval, magicString) {
    // Function to read directory contents and process files
    const processDirectory = () => {
        fs.readdir(directoryPath, async (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }
            try {
                const task = await Task.create({ startTime: new Date(), status: "on progress" });

                let filesAdded = [];  //to store no of files added
                let filesDeleted = [];    //to store no of files deleted

                // Fetch all file changes which as entry with created date greater than starttime of current background task
                const fileChanges = await FileChange.findAll({ where: { createdAt: { [Op.gt]: new Date(task.startTime) } } });
                const existingFiles = fileChanges.map(fileChange => fileChange.filename);

                // Process each file
                files.forEach(async file => {
                    const filePath = `${directoryPath}/${file}`;
                    // Check if file exists in the database or not
                    if (existingFiles.includes(file)) {    // Update the file
                        const fileChange = await FileChange.findOne({ where: { filename: file } });
                        fileChange.changeType = 'update';
                        fileChange.taskId = task.id;
                        await fileChange.save();
                    } else {
                        // Add the file
                        const newFileChange = await FileChange.create({
                            filename: file,
                            changeType: 'add',
                            taskId: task.id
                        });
                        filesAdded.push(newFileChange.filename);
                    }

                    // To read file contents and count occurrences of magic string
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }
                        const magicStringCount = data.split(magicString).length - 1;
                        // Update magicStringCount in the filechange entry
                        FileChange.update({ magicStringCount }, { where: { filename: file, taskId: task.id } });
                    });
                });

                // Deletion logic
                const deletedFiles = existingFiles.filter(file => !files.includes(file));
                deletedFiles.forEach(async file => {
                    // Delete the file change entry from the database
                    await FileChange.destroy({ where: { filename: file, TaskId: task.id } });
                    filesDeleted.push(file);
                });
            } catch (error) {
                console.error('Error processing files:', error);
            }
        });
    };

    processDirectory(); // Calls processDirectory initially and then at regular intervals
    setInterval(processDirectory, interval);
}

module.exports = monitorDirectory;
