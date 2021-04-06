'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.createTable('products', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
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
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            priceSale: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            cateId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        })

    },

    down: async(queryInterface, Sequelize) => {
        queryInterface.dropTable("products");
    }
};