const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Category = sequelize.definde("categories", {
    cateName: {
        type: Sequelize.STRING(40),
        allowNull: false
    }
});

module.exports = Category;