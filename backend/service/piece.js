const PieceService = {
    verifyBishopMove: function BishopMove(board, move){

        var verified = false

        var initialLinePosition = move.getInitialPosition().getLine()
        var initialColumnPosition = move.getInitialPosition().getColumn()
        var finalLinePosition = move.getFinalPosition().getLine()
        var finalColumnPosition = move.getFinalPosition().getColumn()

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
    
    verifyBlackPawnMove: function blackPawnMove(board, move){
        
        var verified = false

        var initialLinePosition = move.getInitialPosition().getLine()
        var initialColumnPosition = move.getInitialPosition().getColumn()
        var finalLinePosition = move.getFinalPosition().getLine()
        var finalColumnPosition = move.getFinalPosition().getColumn()

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
                    if(initialLinePosition + 1 == finalLinePosition  && finalColumnPosition == (initialColumnPosition + 1) || (initialColumnPosition - 1)){
                        verified = true
                    }
                }
            }
        return verified
    },

    verifyWhitePawnMove: function whitePawnMove(board, move){
        
        var verified = false

        var initialLinePosition = move.getInitialPosition().getLine()
        var initialColumnPosition = move.getInitialPosition().getColumn()
        var finalLinePosition = move.getFinalPosition().getLine()
        var finalColumnPosition = move.getFinalPosition().getColumn()

            if(board.getSquare(finalLinePosition, finalColumnPosition) == null){

                if((initialLinePosition == finalLinePosition + 1) && (initialColumnPosition == finalColumnPosition)){
                    verified = true
                }
                
                if(initialLinePosition == 6 && board.getSquare(initialLinePosition - 1, initialColumnPosition) == null){
                    if((finalLinePosition == 4) && (initialColumnPosition == finalColumnPosition)){
                        verified = true
                    }
                }
            }
            
            if(board.getSquare(finalLinePosition, finalColumnPosition) != null){
                if(board.getSquare(finalLinePosition, finalColumnPosition).getColor() != board.getSquare(initialLinePosition, initialColumnPosition).getColor()){
                    if(initialLinePosition - 1 == finalLinePosition && finalColumnPosition == (initialColumnPosition + 1) || (initialColumnPosition - 1)){
                        verified = true
                    }
                }
            }

        return verified
    },



    verifyKnightMove: function knightMove(board, move){

        var verified = false

        var initialLinePosition = move.getInitialPosition().getLine()
        var initialColumnPosition = move.getInitialPosition().getColumn()
        var finalLinePosition = move.getFinalPosition().getLine()
        var finalColumnPosition = move.getFinalPosition().getColumn()

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

    verifyRookMove : function rookMove(board, move){
        
        var verified = false

        var initialLinePosition = move.getInitialPosition().getLine()
        var initialColumnPosition = move.getInitialPosition().getColumn()
        var finalLinePosition = move.getFinalPosition().getLine()
        var finalColumnPosition = move.getFinalPosition().getColumn()

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

    verifyQueenMove : function queenMove(board, move){

        verified = false

            verified = this.verifyBishopMove(board, move)

            if(verified == false){
                verified = this.verifyRookMove(board, move)
            }

        return verified
    },

    verifyKingMove: function kingMove(board, move){

        var verified = false
        
        var initialLinePosition = move.getInitialPosition().getLine()
        var initialColumnPosition = move.getInitialPosition().getColumn()
        var finalLinePosition = move.getFinalPosition().getLine()
        var finalColumnPosition = move.getFinalPosition().getColumn()

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

module.exports = PieceService