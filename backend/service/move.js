const Board = require('../models/board')
const PieceService = require('../service/piece')
const checkService = require('../service/checkService')

const moveService = {
    validateMove : function(board, move, turn){

        initialPosition = move.getInitialPosition()
        finalPosition = move.getFinalPosition()

        if(verifyPieceTurn(board.getSquareByPosition(initialPosition), turn) && verifyPieceMove(board, move) && checkService.verifyIfMovePutsInCheck(board, move)){
            return true
        }

        return false
    },

    doMovement : function(board, move){

        if(board.getSquareByPosition(move.getInitialPosition())){
            
            var keepPiece = board.getSquareByPosition(move.getInitialPosition())
            board.removePieceFromBoardByPosition(move.getInitialPosition())
            board.putPieceOnBoardByPosition(move.getFinalPosition(), keepPiece)

        }

    },

    verifyCheckMate : function(){
        return 2
    }
}

function verifyPieceMove(board, move){

    var verifiedPiece = false

    switch (board.getSquareByPosition(move.getInitialPosition()).getSymbol()) {
        case 'B':
            verifiedPiece = PieceService.verifyBishopMove(board, move)
            break;
        case 'p':
            verifiedPiece = PieceService.verifyBlackPawnMove(board, move)
            break;
        case 'P':
            verifiedPiece = PieceService.verifyWhitePawnMove(board, move)
            break;
        case 'N':
            verifiedPiece = PieceService.verifyKnightMove(board, move)
            break;
        case 'R':
            verifiedPiece = PieceService.verifyRookMove(board, move)
            break;
        case 'Q':
            verifiedPiece = PieceService.verifyQueenMove(board, move)
            break;
        case 'K':
            verifiedPiece = PieceService.verifyKingMove(board, move)
            break;
    
        default:
            break;
    }
    return verifiedPiece
}

function verifyPieceTurn(square, turn){

    if(!square){
        return false
    }

    if(turn % 2 == 0){
        if(square.getColor() == 'white'){
            return true
        }
    }else if(square.getColor() == 'black'){
        return true
    }

    return false

}


module.exports = moveService


