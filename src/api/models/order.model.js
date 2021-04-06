const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Order = sequelize.definde("orders", {
    status: {
        type: Sequelize.STRING
    },
    totalMoney: {
        type: Sequelize.INTEGER,
    },
    userId: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Order;