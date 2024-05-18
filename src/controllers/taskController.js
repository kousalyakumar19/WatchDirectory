const Task = require('../models/Task');
const Configuration = require('../models/Configuration');
const monitorDirectory = require('../utils/BackgroundTask.js');

exports.startTask = async (req, res) => {
    try {
        const { directoryPath, interval, magicString } = req.body;   // Fetch configuration details from request body
        monitorDirectory(directoryPath, interval, magicString);   // Start the background task to read the files by calling

        // Create a new task entry in the database
        const task = await Task.create({
            startTime: new Date(),
            status: 'in progress'
        });

        return res.status(200).json({ message: 'Background task started successfully', task });
    } catch (error) {
        console.error('Error starting task:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.stopTask = async (req, res) => {
    try {
        const taskDetails = await Task.findByPk(req.query.id);
        if (!taskDetails) return res.status(404).json({ error: 'Task not found' });
        else if (taskDetails) {
            const startTime = new Date(taskDetails.startTime);
            const endTime = new Date(taskDetails.endTime);
            const runtime = Math.round((endTime - startTime) / 1000)  // to calculate in seconds
            await taskDetails.update({ status: 'stopped', endTime: new Date(), runtime: runtime });
        }
        return res.status(200).json({ message: 'Background task stopped successfully' });
    } catch (error) {
        console.error('Error stopping task:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTaskDetails = async (req, res) => {
    try {
        // Fetch details of the latest task
        const taskDetails = await Task.findOne({ order: [['startTime', 'DESC']] });
        return res.status(200).json({ taskDetails: taskDetails });
    } catch (error) {
        console.error('Error fetching task details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};