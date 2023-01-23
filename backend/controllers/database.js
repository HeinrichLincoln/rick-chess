const DBGame = require('../models/DBGame')
const DBHistory = require('../models/DBHistory')
const database = require('../models/dataBase')

var newGame
var verifiedIfGameStarted = false


const dataBaseService = {
    PutValuesInDataBase: function PutValuesInDataBase(piece, color, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){

        var sendToDataBase

        (async () => {

            if(verifiedIfGameStarted === false){
                verifiedIfGameStarted = true
                database.sync()
                newGame =  DBGame.create({
                    status: 'in game',
                    winner: 'in game'
                }) 
            }

            console.log()

            sendToDataBase = {
                piece: piece,
                color: color,
                initial_line_position: initialLinePosition,
                initial_column_position: initialColumnPosition,
                final_line_position: finalLinePosition, 
                final_column_position: finalColumnPosition,
                game_id: newGame.id
            }

            await DBHistory.create(sendToDataBase)

        })()

    }
}

module.exports = dataBaseService