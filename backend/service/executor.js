/*

    executar açoes relacionadas ao jogo de xadrez

*/

const executorService = {
    makeMove : function(board, move){

        if(board.getSquareByPosition(move.getInitialPosition())){
            
            var keepPiece = board.getSquareByPosition(move.getInitialPosition())
            board.removePieceFromBoardByPosition(move.getInitialPosition())
            board.putPieceOnBoardByPosition(keepPiece, move.getFinalPosition())

        }
    }
}

module.exports = executorService
