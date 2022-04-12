const ThreatBoard = require('../models/boardThreat')
const MoveService = require('../service/move')

const checkService = {

    isPlayerInCheck: function(board, turn){

        var threatBoard = new ThreatBoard()

        putThreat.putThreatOnBoard(board, threatBoard)

        for(var i = 0; i <= 7; i++){
            for(var j = 0; j <= 7; j++){

                if(board.getSquare(i, j)){
                    if(board.getSquare(i, j).getSymbol() == 'K'){

                        if(board.getSquare(i, j).getColor() == 'white' && getColorFromTurn(turn) == 'white'){
                            if(isBlackPieceAtacking(positionOnThreatBoard)){
                                return true
                            }
                        }else{
                            if(isWhitePieceAtacking(positionOnThreatBoard)){
                                return true
                            }
                        }
                    }
                }

            }
        }
        return false
    },

    verifyIfMovePutsInCheck: function(board, move){
        
        var boardCopy = new Board()
        var arrayCopy = board.getBoard().map((x) => ([...x]))
        boardCopy.setBoard(arrayCopy)


        MoveService.doMovement(boardCopy, move)

        return true

    },


}

function getColorFromTurn(turn){

        if(turn % 2 == 0){

            return 'white'

        }else{

            return 'black'

        }

}

function isBlackPieceAtacking(positionOnThreatBoard){

    if((positionOnThreatBoard == 2) || (positionOnThreatBoard == 3) || (positionOnThreatBoard == 5)){
        return true
    }

    return false

}

function isWhitePieceAtacking(positionOnThreatBoard){

    if((positionOnThreatBoard == 1) || (positionOnThreatBoard == 3) || (positionOnThreatBoard == 4)){
        return true
    }

    return false

}

module.exports = checkService