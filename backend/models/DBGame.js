const Sequelize = require('sequelize')
const database = require('./dataBase')

const Game = database.define('game', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    status: {
        type: Sequelize.STRING,
    },

    winner: {
        type: Sequelize.STRING,
    }
},
{
    timestamps: false,
    freezeTableName: true,
})

module.exports = Game