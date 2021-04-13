const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = OrderItem;