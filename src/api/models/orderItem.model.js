const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const OrderItem = sequelize.definde("order_items", {
    orderId: {
        type: Sequelize.INTEGER,
    },
    productId: {
        type: Sequelize.INTEGER,
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = OrderItem;