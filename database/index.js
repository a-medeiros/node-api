const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const connectionDB = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.USER_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

connectionDB.authenticate()
    .then(() => console.log('Connected to database'))
    .catch(err => console.log("Impossible to connect to the database: " + err));


module.exports = connectionDB;