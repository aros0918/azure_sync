// Define the 'Herd' Model
const Sequelize = require('sequelize')
const { db } = require('./../helpers/db')
const Herd = db.define('PitstopPLUS_syncherd', {
    'hId': Sequelize.STRING,
    herdNumber: Sequelize.BIGINT
})
module.exports = { Herd }