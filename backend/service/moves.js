const Board = require('../models/board')
const {check,
    checkMate} = require('../service/check')

function realizeMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition,turn){

    var response
    
    if(board.getSquare(initialLinePosition, initialColumnPosition) != null){
        if((validMove.pieceMoveIsValid(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition) == true) && (validMove.whiteTurn(board, initialLinePosition, initialColumnPosition, turn) == true)){
            var keepPiece = board.getSquare(initialLinePosition, initialColumnPosition)
            board.removePieceFromBoard(initialLinePosition, initialColumnPosition)
            board.putPieceOnBoard(finalLinePosition, finalColumnPosition, keepPiece)
            response = 200
        }else{
            response = 'Invalid Move'
        }
    }else{
        response = 'Invalid Move'
    }
    return response
}



const verifypiecesMove = {
    verifyBishopMove: function BishopMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){

        var verified = false

            if(board.getSquare(finalLinePosition, finalColumnPosition) == null || board.getSquare(finalLinePosition, finalColumnPosition).getColor() != board.getSquare(initialLinePosition, initialColumnPosition).getColor()){

                if((initialLinePosition < finalLinePosition) && (initialColumnPosition < finalColumnPosition)){
                    var j = initialColumnPosition + 1
                    for(var i = initialLinePosition + 1; i <= finalLinePosition; i++){
                        if(board.getSquare(i, j) == null){
                            verified = true
                        }
                        j++
                        if(j == finalColumnPosition){
                            break
                        }
                    }
                }
                if((initialLinePosition < finalLinePosition)&&(initialColumnPosition > finalColumnPosition)){
                    var j = initialColumnPosition - 1
                    for(var i = initialLinePosition + 1; i <= finalLinePosition; i++){
                        if(board.getSquare(i, j) == null){
                            verified = true
                        }
                        j--
                        if(j == finalColumnPosition){
                            break
                        }
                    }
                }
                if((initialLinePosition > finalLinePosition)&&(initialColumnPosition > finalColumnPosition)){
                    var j = initialColumnPosition - 1
                    for(var i = initialLinePosition - 1; i >= finalLinePosition; i--){
                        if(board.getSquare(i, j) == null){
                            verified = true
                        }
                        j--
                        if(j == finalColumnPosition){
                            break
                        }
                    }
                }
                if((initialLinePosition > finalLinePosition)&&(initialColumnPosition < finalColumnPosition)){
                    var j = initialColumnPosition + 1
                    for(var i = initialLinePosition - 1; i >= finalLinePosition; i--){
                        if(board.getSquare(i, j) == null){
                            verified = true
                        }
                        j++
                        if(j == finalColumnPosition){
                            break
                        }
                    }
                }
            }
            return verified
    },
    
    verifyBlackPawnMove: function blackPawnMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){
        
        var verified = false

            if(board.getSquare(finalLinePosition, finalColumnPosition) == null){

                if((initialLinePosition  + 1 == finalLinePosition) && (initialColumnPosition == finalColumnPosition)){
                    verified = true
                }
                
                if(initialLinePosition == 1 && board.getSquare(initialLinePosition + 1, initialColumnPosition) == null){
                    if((initialLinePosition == finalLinePosition - 2) && (initialColumnPosition == finalColumnPosition)){
                        verified = true
                    }
                }
            }
            if(board.getSquare(finalLinePosition, finalColumnPosition) != null){
                if(board.getSquare(finalLinePosition, finalColumnPosition).getColor() != board.getSquare(initialLinePosition, initialColumnPosition).getColor()){
                    if(initialLinePosition + 1 == finalLinePosition  && finalColumnPosition == (initialColumnPosition + 1 || initialColumnPosition - 1)){
                        verified = true
                    }
                }
            }
        return verified
    },

    verifyWhitePawnMove: function whitePawnMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){
        
        var verified = false

            if(board.getSquare(finalLinePosition, finalColumnPosition) == null){

                if((initialLinePosition == finalLinePosition + 1) && (initialColumnPosition == finalColumnPosition)){
                    verified = true
                }
                
                if(initialLinePosition == 6 && board.getSquare(initialLinePosition - 1, initialColumnPosition) == null){
                    if((initialLinePosition == finalLinePosition + 2) && (initialColumnPosition == finalColumnPosition)){
                        verified = true
                    }
                }
            }
            if(board.getSquare(finalLinePosition, finalColumnPosition) != null){
                if(board.getSquare(finalLinePosition, finalColumnPosition).getColor() != board.getSquare(initialLinePosition, initialColumnPosition).getColor()){
                    if(initialLinePosition - 1 == finalLinePosition && finalColumnPosition == (initialColumnPosition + 1 || initialColumnPosition - 1)){
                        verified = true
                    }
                }
            }

        return verified
    },



    verifyKnightMove: function knightMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){
        var verified = false

            if(board.getSquare(finalLinePosition, finalColumnPosition) == null || board.getSquare(finalLinePosition, finalColumnPosition).getColor() != board.getSquare(initialLinePosition, initialColumnPosition).getColor()){

                if((initialLinePosition + 2 == finalLinePosition) && (initialColumnPosition - 1 == finalColumnPosition)){
                    verified = true
                }

                if((initialLinePosition + 1 == finalLinePosition) && (initialColumnPosition - 2 == finalColumnPosition)){
                    verified = true
                }

                if((initialLinePosition - 1 == finalLinePosition) && (initialColumnPosition - 2 == finalColumnPosition)){
                    verified = true
                }

                if((initialLinePosition - 2 == finalLinePosition) && (initialColumnPosition - 1 == finalColumnPosition)){
                    verified = true
                }

                if((initialLinePosition - 2 == finalLinePosition) && (initialColumnPosition + 1 == finalColumnPosition)){
                    verified = true
                }

                if((initialLinePosition - 2 == finalLinePosition) && (initialColumnPosition + 2 == finalColumnPosition)){
                    verified = true
                }

                if((initialLinePosition + 1 == finalLinePosition) && (initialColumnPosition + 2 == finalColumnPosition)){
                    verified = true
                }

                if((initialLinePosition + 2 == finalLinePosition) && (initialColumnPosition + 1 == finalColumnPosition)){
                    verified = true
                }
            }
        return verified
    },

    verifyRookMove : function rookMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){
        var verified = false

            if(board.getSquare(finalLinePosition, finalColumnPosition) == null || board.getSquare(finalLinePosition, finalColumnPosition).getColor() != board.getSquare(initialLinePosition, initialColumnPosition).getColor()){
                
                if(initialLinePosition < finalLinePosition){
                    for(var i = initialLinePosition + 1; i < finalLinePosition; i++){
                        if(board.getSquare(i, initialColumnPosition) == null && (initialColumnPosition == finalColumnPosition)){
                            verified = true
                        }
                    }
                }

                if(initialLinePosition > finalLinePosition){
                    for(var i = finalLinePosition + 1; i < initialLinePosition; i++){
                        if(board.getSquare(i, initialColumnPosition) == null && (initialColumnPosition == finalColumnPosition)){
                            verified = true
                        }
                    }
                }

                if(initialColumnPosition < finalColumnPosition){
                    for(var i = initialColumnPosition + 1; i < finalColumnPosition; i++){
                        if(board.getSquare(initialLinePosition, i) == null && (initialLinePosition == finalLinePosition)){
                            verified = true
                        }
                    }
                }

                if(initialColumnPosition > finalColumnPosition){
                    for(var i = finalColumnPosition + 1; i < initialColumnPosition; i++){
                        if(board.getSquare(initialLinePosition, i) == null && (initialLinePosition == finalLinePosition)){
                            verified = true
                        }
                    }
                }

                if(initialLinePosition + 1 == finalLinePosition && initialColumnPosition == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition - 1 == finalLinePosition && initialColumnPosition == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition == finalLinePosition && initialColumnPosition + 1 == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition == finalLinePosition && initialColumnPosition - 1 == finalColumnPosition){
                    verified = true
                }
            }  
        return verified
    },

    verifyQueenMove : function queenMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){
        verified = false

            verified = this.verifyBishopMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)

            if(verified == false){
                verified = this.verifyRookMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)
            }

        return verified
    },

    verifyKingMove: function kingMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){
        var verified = false

            if(board.getSquare(finalLinePosition, finalColumnPosition) == null || board.getSquare(finalLinePosition, finalColumnPosition).getColor() != board.getSquare(initialLinePosition, initialColumnPosition).getColor()){
                
                if(initialLinePosition + 1 == finalLinePosition && initialColumnPosition - 1 == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition == finalLinePosition && initialColumnPosition - 1 == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition - 1 == finalLinePosition && initialColumnPosition - 1 == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition - 1 == finalLinePosition && initialColumnPosition == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition - 1 == finalLinePosition && initialColumnPosition + 1 == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition  == finalLinePosition && initialColumnPosition + 1 == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition + 1 == finalLinePosition && initialColumnPosition + 1 == finalColumnPosition){
                    verified = true
                }

                if(initialLinePosition + 1 == finalLinePosition && initialColumnPosition == finalColumnPosition){
                    verified = true
                }
            }
        return verified
    }
}

var validMove = {
    pieceMoveIsValid : function isMoveValid (board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition){

        var verifiedPiece = false

            switch (board.getSquare(initialLinePosition, initialColumnPosition).getSymbol()) {
                case 'B':
                    verifiedPiece = verifypiecesMove.verifyBishopMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)
                    break;
                case 'p':
                    verifiedPiece = verifypiecesMove.verifyBlackPawnMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)
                    break;
                case 'P':
                    verifiedPiece = verifypiecesMove.verifyWhitePawnMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)
                    break;
                case 'N':
                    verifiedPiece = verifypiecesMove.verifyKnightMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)
                    break;
                case 'R':
                    verifiedPiece = verifypiecesMove.verifyRookMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)
                    break;
                case 'Q':
                    verifiedPiece = verifypiecesMove.verifyQueenMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)
                    break;
                case 'K':
                    verifiedPiece = verifypiecesMove.verifyKingMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition)
                    break;
            
                default:
                    break;
            }
        return verifiedPiece
    },
    whiteTurn: function isWhiteTurn(board, initialLinePosition, initialColumnPosition, turn){

        var whiteTurn = false

            if(turn % 2 == 0){
                if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){
                    whiteTurn = true
                }
            }else 
                if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'black'){
                    whiteTurn = true
                }
            return whiteTurn
    }
}

const isMoveWillRealize = {
    realizeMovement: function realizeMovement(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition, KingInCheck, turn, threatBoard){

        var isKingContinuesInCheck = false
        var response

        if(KingInCheck == true){
            var boardCopy = new Board()
            var arrayCopy = board.getBoard().map((x) => ([...x]))
            boardCopy.setBoard(arrayCopy)

            response = realizeMove(boardCopy, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition,turn)

            if(turn % 2 == 0){
                isKingContinuesInCheck = check.isKingInCheck(boardCopy, finalLinePosition, finalColumnPosition).whiteKingInCheck 
            }else{
                isKingContinuesInCheck = check.isKingInCheck(boardCopy, finalLinePosition, finalColumnPosition).blackKingInCheck
            }


        }

        if(isKingContinuesInCheck == false){
            response = realizeMove(board, initialLinePosition, initialColumnPosition, finalLinePosition, finalColumnPosition,turn)
        }else{
            response = 'Invalid Move'
        }

        return response
    }
}


module.exports = isMoveWillRealize