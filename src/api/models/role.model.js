const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Role = sequelize.definde("roles", {
    roleName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    }
});

module.exports = Role;