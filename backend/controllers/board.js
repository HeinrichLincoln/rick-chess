const {check,
    checkMate} = require('../service/check')
const Board = require('../models/board')
const ThreatBoard = require('../models/boardThreat')
const isMoveWillRealize = require('../service/moves')
const checkService = require('../service/checkService')
const MoveDto = require('../models/dto/moveDto')
const moveService = require('../service/move')
var board = new Board()
var threatBoard = new ThreatBoard()
var turn = 0
var result = 'In game'

const realizeMovement = (req, res) => {

    // O que deveria fazer?
    /* 
    1) Valida se o movimento é possível
    2) faz o movimento 
    3) Se for Mate acaba o jogo, senão faz a jogada
    */

    var move = new MoveDto(req.body)

    var moveIsPossible = moveService.validateMove(board, move, turn)
    
    var initialLinePosition = req.body.initialLinePosition
    var initialColumnPosition = req.body.initialColumnPosition
    
    var finalLinePosition = req.body.finalLinePosition
    var finalColumnPosition = req.body.finalColumnPosition

    var move = new MoveDto(req.body)

    var mate
    var response
    var thisMovePutOtherKingInCheck
    var kingIsThreated

    

    //criar um arquivo(doMovement.js) com uma funcao(verifingAndRealesingMove) na pasta de service linha 28 a 48
    /*if(turn % 2 == 0){
        kingIsThreated = checkS.isKingInCheck(board, finalLinePosition, finalColumnPosition).whiteKingInCheck
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
    }*/

    //criar um arquivo(response.js) na pasta service com a funcao (formulingResponse) linha 51 a 67
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