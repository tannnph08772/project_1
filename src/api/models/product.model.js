const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Product = sequelize.definde("products", {
    productName: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    productDetail: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING
    },
    cateId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    priceSale: {
        type: Sequelize.INTEGER
    }

});

module.exports = Product;