const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const OrderPayment = sequelize.definde("order_payments", {
    methodName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderId: {
        type: Sequelize.INTEGER,
    }
});

module.exports = OrderPayment;