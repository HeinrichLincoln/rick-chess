/*

    esse service é responsavel por validaçoes dos tipos de movimentos do xadrez

*/


const Board = require('../models/board')
const PieceService = require('../service/piece')
const checkService = require('../service/checkService')

const moveService = {
    // se o movimento feito não é válido (coloca em cheque) retorna false
    validateMove: function (board, move, turn) {

        initialPosition = move.getInitialPosition()
        finalPosition = move.getFinalPosition()

        if (verifyPieceTurn(board.getSquareByPosition(initialPosition), turn)) {
            if(verifyPieceMove(board, move)){
                if(!checkService.verifyIfMovePutsInCheck(board, move)){
                    return true
                }
            }
        }

        return false
    }, 

}

function verifyPieceMove(board, move) {

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

function verifyPieceTurn(square, turn) {

    if (!square) {
        return false
    }

    if (turn % 2 == 0) {
        if (square.getColor() == 'white') {
            return true
        }
    } else if (square.getColor() == 'black') {
        return true
    }

    return false

}


module.exports = moveService


