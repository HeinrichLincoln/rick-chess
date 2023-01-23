const Sequelize = require('sequelize')
const database = require('./dataBase')
const Game = require('./DBGame')

const History = database.define('History', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    piece: {
        type: Sequelize.STRING,
    },

    color: {
        type: Sequelize.STRING,
    },

    initialLinePosition: {
        type: Sequelize.INTEGER,
    },

    initialColumnPosition: {
        type: Sequelize.INTEGER,
    },

    finalLinePosition: {
        type: Sequelize.INTEGER,
    },

    finalColumnPosition: {
        type: Sequelize.INTEGER,
    }

},
{
    timestamps: false,
    freezeTableName: true,
})

History.belongsTo(Game, {
    constraint: true,
    foreignKey: 'game_id'
})

History.hasMany(Game, {
    foreignKey: 'game_id'
})

//History.sync()

module.exports = History