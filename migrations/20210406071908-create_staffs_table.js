'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.createTable('staffs', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
            },
            phoneNumber: {
                type: Sequelize.STRING(11),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            idRole: {
                type: Sequelize.INTEGER,
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
        queryInterface.dropTable("staff");
    }
};