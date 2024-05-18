const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
    host: config.database.host,
    dialect: 'mysql',
    logging: false
});
module.exports = sequelize;