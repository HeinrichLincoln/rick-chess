const {check,
    checkMate} = require('../service/check')
const Board = require('../models/board')
const ThreatBoard = require('../models/boardThreat')
const isMoveWillRealize = require('../service/moves')
const checkService = require('../service/checkService')
const MoveDto = require('../models/dto/moveDto')
const moveService = require('../service/move')
const executorService = require('../service/executor')
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
   
    res.send('OK')
    return

    var move = new MoveDto(req.body)

    var moveIsPossible = moveService.validateMove(board, move, turn)

    if(!moveIsPossible){ 

        res.send('Invalid Move')

    }

    executorService.makeMove(board, move)
    turn++

        res.sendStatus(200)
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

function test1(){

    res.send('OK')

}

function test2(){

    res.send('Invalid Move')

}

module.exports = {
    realizeMovement,
    reset,
    returnBoard,
    returnResult,
    draw
}