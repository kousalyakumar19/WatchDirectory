require('dotenv').config();

module.exports = {
    directoryPath: process.env.DIRECTORY_PATH || './watched_dir',
    interval: parseInt(process.env.INTERVAL, 10) || 60000,
    magicString: process.env.MAGIC_STRING || 'magic',
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
};