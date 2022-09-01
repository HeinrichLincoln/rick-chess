/*

    esse service é responsavel por interfaciar funcoes responsaveis pelo cheque e chequemate

*/

const ThreatBoard = require('../models/boardThreat')
const executorService = require('../service/executor')
const Board = require('../models/board')
const threatBoardService = require('../service/threatService')
const Position = require('../models/position')

const checkService = {

    verifyIfMovePutsInCheck: function(board, move){
        
        var boardCopy = new Board()
        var arrayCopy = board.getBoard().map((x) => ([...x]))
        boardCopy.setBoard(arrayCopy)

        executorService.makeMove(boardCopy, move)

        return verifyCheck(board, getColorFromMove(board, move))

    },

    verifyCheckMate: function(board){

        //to do

    }


}

function  verifyCheck(board, color){

    var threatBoard = threatBoardService.createThreatBoard(board)

    for(var i = 0; i <= 7; i++){
        for(var j = 0; j <= 7; j++){

            if(board.getSquare(i, j)){
                if(board.getSquare(i, j).getSymbol() == 'K'){

                    if(board.getSquare(i, j).getColor() == 'white' && color == 'white'){
                        if(isBlackPieceAtacking(threatBoard.getSquareByPosition(new Position(i, j)))){
                            return true
                        }
                    }else if(board.getSquare(i, j).getColor() == 'black' && color == 'black'){
                        if(isWhitePieceAtacking(threatBoard.getSquareByPosition(new Position(i, j)))){
                            return true
                        }
                    }
                }
            }

        }
    }
    return false
}

function getColorFromMove(board, move){

    return board.getSquareByPosition(move.getInitialPosition()).getColor()

}


function getColorFromTurn(turn){

        if(turn % 2 == 0){

            return 'white'

        }else{

            return 'black'

        }

}

function isBlackPieceAtacking(threatedPieceValue){

    if((threatedPieceValue == 2) || (threatedPieceValue == 3) || (threatedPieceValue == 5)){
        return true
    }

    return false

}

function isWhitePieceAtacking(threatedPieceValue){

    if((threatedPieceValue == 1) || (threatedPieceValue == 3) || (threatedPieceValue == 4)){
        return true
    }

    return false

}

module.exports = checkService