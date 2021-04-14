const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('project_1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: 0,
    logging: false
});

module.exports = sequelize;
global.sequelize = sequelize;