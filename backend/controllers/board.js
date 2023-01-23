const Board = require('../models/board')
const MoveDto = require('../models/dto/moveDto')
const moveService = require('../service/move')
const executorService = require('../service/executor')
const dataBaseService = require('../controllers/database')
//const DBGame = require('../models/DBGame')
//const DBHistory = require('../models/DBHistory')
//const database = require('../models/dataBase')
//database.sync()
    /*const newGame =  DBGame.create({
        status: 'in game',
        winner: 'in game'
    })*/ 


var board = new Board()
var turn = 0
var result = 'In game'

const realizeMovement = async(req, res) => {

    //await database.sync({force: true})
    //var sendToDataBase

    var move = new MoveDto(req.body)

    var moveIsPossible = moveService.validateMove(board, move, turn)

    if(!moveIsPossible){ 

        res.send('Invalid Move')
        return
    }

    executorService.makeMove(board, move)
    turn++

    var piece = board.getSquareByPosition(finalPosition).getSymbol()
    var color = board.getSquareByPosition(finalPosition).getColor()
    var initialLinePosition = req.body.initialLinePosition
    var initialColumnPosition = req.body.initialColumnPosition
    var finalLinePosition = req.body.finalLinePosition
    var finalColumnPosition = req.body.finalColumnPosition

    dataBaseService.PutValuesInDataBase(piece, color, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)

    /*sendToDataBase = {
        piece: board.getSquareByPosition(finalPosition).getSymbol(),
        color: board.getSquareByPosition(finalPosition).getColor(),
        initial_line_position: req.body.initialLinePosition,
        initial_column_position: req.body.initialColumnPosition,
        final_line_position: req.body.finalLinePosition,
        final_column_position: req.body.finalColumnPosition,
        game_id: newGame.id
    }*/

    //console.log(newGame)
    //console.log(sendToDataBase)

    
    //await DBHistory.create(sendToDataBase)
        res.send('OK')
}

const reset = (req, res) => {
    board = new Board()
    turn = 0
    result = 'In game'
    
    //alterar por meio do UPDATE a tabela GAME (id = autoIncrement, status = "in game", winner= "null")
    /*
        alterar por meio do DELETE a tabela history (deletando tds os values)
    */

    res.sendStatus(200)
}

const returnBoard = (req, res) => {
    res.send(board)
}

const draw = (req, res) => {
    result = req.body.draw
    //alterar por meio do UPDATE a tabela GAME (status = "game over")
    res.sendStatus(200)
}

const returnResult = (req, res) => {
    res.send(result)
}


module.exports = {
    realizeMovement,
    reset,
    returnBoard,
    returnResult,
    draw
}