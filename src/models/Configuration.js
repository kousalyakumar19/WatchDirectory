const { DataTypes } = require('sequelize');
const sequelize = require('../utils/Database');

const Configuration = sequelize.define('Configuration', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    directoryPath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    interval: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    magicString: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Configuration;