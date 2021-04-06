'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.createTable('roles', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            roleName: {
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
        queryInterface.dropTable("roles");
    }
};