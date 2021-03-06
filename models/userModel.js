const Sequelize = require('sequelize');
const db = require('../database/index');

const User = db.define('users', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

module.exports = User;