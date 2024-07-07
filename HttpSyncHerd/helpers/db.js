const Sequelize = require('sequelize');
const { userName, password, hostName, sampleDbName } = require('./../config')


const sampleDb = new Sequelize(sampleDbName, userName, password, {
    dialect: 'mssql',
    host: hostName,
    port: 1433, // Default port
    logging: false,
    dialectOptions: {
        options: {
            requestTimeout: 300000,
            encrypt: true
        }
    }

});

module.exports = { db: sampleDb }