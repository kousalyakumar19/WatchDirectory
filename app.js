const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/taskRoutes.js');
const configRoutes = require('./src/routes/configRoutes.js');
const sequelize = require('./src/utils/Database.js');
const logger = require('./src/utils/logger.js');
const Configuration = require('../models/Configuration');
const monitorDirectory = require('./src/utils/BackgroundTask.js');

const app = express();
app.use(bodyParser.json());

app.use(taskRoutes);
app.use(configRoutes);

sequelize.sync().then(() => {     // To sync the models to the DB
    logger.info('Database synchronized with models...');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => { logger.info(`Server is running on port ${PORT}`); });
}).catch(err => {
    logger.error('Error synchronizing models with database:', err);
});

await Configuration.create({    // when initializing the server create configuration
    directoryPath: process.env.DIRECTORY_PATH || './watched_dir',
    interval: process.env.INTERVAL || 60000,
    magicString: process.env.MAGIC_STRING || 'magic'
})

monitorDirectory(process.env.DIRECTORY_PATH, process.env.INTERVAL, process.env.MAGIC_STRING);