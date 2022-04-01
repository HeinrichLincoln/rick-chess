const {check,
    checkMate} = require('../service/check')
const Board = require('../models/board')
const ThreatBoard = require('../models/boardThreat')
const isMoveWillRealize = require('../service/moves')
var board = new Board()
var threatBoard = new ThreatBoard()
var turn = 0
var result = 'In game'

const realizeMovement = (req, res) => {
    
    var initialLinePosition = req.body.initialLinePosition
    var initialColumnPosition = req.body.initialColumnPosition
    var finalLinePosition = req.body.finalLinePosition
    var finalColumnPosition = req.body.finalColumnPosition
    var mate
    var response
    var thisMovePutOtherKingInCheck
    var kingIsThreated

    if(turn % 2 == 0){
        kingIsThreated = check.isKingInCheck(board, finalLinePosition, finalColumnPosition).whiteKingInCheck
    }else{
        kingIsThreated = check.isKingInCheck(board, finalLinePosition, finalColumnPosition).blackKingInCheck
    }

    response = isMoveWillRealize.realizeMovement(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition, kingIsThreated, turn)

    if(turn % 2 == 0){
        thisMovePutOtherKingInCheck = check.isKingInCheck(board, finalLinePosition, finalColumnPosition).blackKingInCheck
    }else{
        thisMovePutOtherKingInCheck = check.isKingInCheck(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition).whiteKingInCheck
    }

    if(thisMovePutOtherKingInCheck == true){
        if(turn % 2 == 0){
            mate = checkMate.isCheckMate(board, threatBoard, finalLinePosition, finalColumnPosition)
        }else{
            mate = checkMate.isCheckMate(board, threatBoard, finalLinePosition, finalColumnPosition)
        }
    }

    console.log(mate)


    if(mate == true){
        res.send('The game over')
        if(turn % 2 == 0){
            result = 'White Wins'
        }else{
            result = 'Black Wins'
        }
    }

    if(mate != true){
        if(response == 200){
            turn++
            res.sendStatus(200)
        }else{
            res.send('Invalid Move')
        }
    }
}

const reset = (req, res) => {
    board = new Board()
    turn = 0
    result = 'In game'
    res.sendStatus(200)
}

const returnBoard = (req, res) => {
    res.send(board)
}

const draw = (req, res) => {
    result = req.body.draw
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