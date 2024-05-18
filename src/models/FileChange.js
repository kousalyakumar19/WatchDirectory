const { DataTypes } = require('sequelize');
const sequelize = require('../utils/Database.js');

const FileChange = sequelize.define('FileChange', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    changeType: {
        type: DataTypes.ENUM('add', 'update', 'delete'),
        allowNull: false
    },
    magicStringCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    taskId: {
        type: DataTypes.INTEGER
    }
});

module.exports = FileChange;