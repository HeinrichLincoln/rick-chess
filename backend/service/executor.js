const executorService = {
    makeMove : function(board, move){

        if(board.getSquareByPosition(move.getInitialPosition())){
            
            var keepPiece = board.getSquareByPosition(move.getInitialPosition())
            board.removePieceFromBoardByPosition(move.getInitialPosition())
            board.putPieceOnBoardByPosition(move.getFinalPosition(), keepPiece)

        }

    }
}

module.exports = executorService
