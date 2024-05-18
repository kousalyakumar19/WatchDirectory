const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/Database');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    runtime: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    filesAdded: {
        type: DataTypes.JSON,
        allowNull: true
    },
    filesDeleted: {
        type: DataTypes.JSON,
        allowNull: true
    },
    magicStringCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Task;
