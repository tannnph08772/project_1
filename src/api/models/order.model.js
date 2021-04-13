const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    total: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    status: Sequelize.STRING,
});

module.exports = Order;