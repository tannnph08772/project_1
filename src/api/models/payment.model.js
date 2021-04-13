const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Payment = sequelize.define("Payment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    staffId: Sequelize.INTEGER,
    paymentMethod: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    orderId: Sequelize.INTEGER,
});

module.exports = Payment;