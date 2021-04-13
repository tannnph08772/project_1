const sequelize = require('../../../database/connection');
const Sequelize = require('sequelize');

const Staff = sequelize.define("staffs", {
    name: {
        type: Sequelize.STRING(40),
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
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    idRole: {
        type: Sequelize.INTEGER,
    }

});

module.exports = Staff;