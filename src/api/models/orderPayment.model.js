const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const OrderPayment = sequelize.define("order_payments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymenyt_method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderId: {
        type: Sequelize.INTEGER,
    }
});

module.exports = OrderPayment;