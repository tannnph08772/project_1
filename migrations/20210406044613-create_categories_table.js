'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.createTable('categories', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            cateName: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        queryInterface.dropTable("categories");
    }
};