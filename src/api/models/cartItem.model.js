const Sequelize = require('sequelize');
const sequelize = require('../../../database/connection');


const CartItem = sequelize.define('cartItem', {
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
    price_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

});

module.exports = CartItem;