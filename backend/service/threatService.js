/*

    lida com as regras  tabuleiro de ameaça

*/


//to do: passar as funcoes das pecas pra ca

const ThreatBoard = require('../models/boardThreat')
const Position = require('../models/position')

const ThreatBoardService = {

    createThreatBoard: function(board){

        var threatBoard = new ThreatBoard()
        
        for(var i = 0; i <= 7; i++){
            for(var j = 0; j <= 7; j++){
                
                if(board.getSquare(i, j)){
                        switch (board.getSquare(i, j).getSymbol()) {
                            case 'B':
                                bishopPopulateThreadBoard(board, threatBoard, new Position(i, j))
                                break;
                            case 'R':
                                rookPopulateThreadBoard(board, threatBoard, new Position(i, j))
                                break;
                            case 'P':
                                whitePawnPopulateThreadBoard(board, threatBoard, new Position(i, j))
                                break;
                            case 'p':
                                blackPawnPopulateThreadBoard(board, threatBoard, new Position(i, j))
                                break;
                            case 'Q':
                                queenPopulateThreadBoard(board, threatBoard, new Position(i, j))
                                break;
                            case 'N':
                                knightPopulateThreadBoard(board, threatBoard, new Position(i, j)) 
                            break;
                            case 'K':
                                kingPopulateThreadBoard(board, threatBoard, new Position(i, j))
                            break;
                            default:
                                break;
                        }
                }

            }
        }

        return threatBoard
    }
}

function setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, i, j){

    if(board.getSquare(i, j)){
        if(board.getSquare(i, j).getSymbol() == 'K'){
            if(board.getSquare(i, j).getColor() == 'white'){
                if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'black'){
                    board.getSquare(initialLinePosition, initialColumnPosition).setChecking(true)
                }else{
                    board.getSquare(initialLinePosition, initialColumnPosition).setChecking(false)
                }
            }else 
                if(board.getSquare(i, j).getColor() == 'black'){
                    if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){
                        board.getSquare(initialLinePosition, initialColumnPosition).setChecking(true)
                    }else{
                        board.getSquare(initialLinePosition, initialColumnPosition).setChecking(false)
                    }
                }
        }
    }
}


function bishopPopulateThreadBoard(board, threatBoard, piecePosition){


    if(piecePosition.getLine() <  7 && piecePosition.getColumn()  > 0){

        var j = piecePosition.getColumn() - 1
        for(var i = piecePosition.getLine() + 1; i <= 7; i++){

            putValueOnThreatBoard(threatBoard, new Position(i, j), board.getSquareByPosition(piecePosition).getColor())

            if(j == 0 || board.hasPiece(i, j)){
                setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), i, j)
                break 
            }

            j--
        }
    }

    if(piecePosition.getLine() <  7 && piecePosition.getColumn()  < 7){

        var j = piecePosition.getColumn() + 1
        for(var i = piecePosition.getLine() + 1; i <= 7; i++){

            putValueOnThreatBoard(threatBoard, new Position(i, j), board.getSquareByPosition(piecePosition).getColor())

            if(j == 0 || board.hasPiece(i, j)){
                setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), i, j)
                break 
            }
            
            j++
        }
    }
    
    if(piecePosition.getLine() >  0 && piecePosition.getColumn()  < 7){


        var j = piecePosition.getColumn() + 1
        for(var i = piecePosition.getLine() - 1; i >= 0; i--){

            putValueOnThreatBoard(threatBoard, new Position(i, j), board.getSquareByPosition(piecePosition).getColor())

            if(j == 7 || board.hasPiece(i, j)){
                setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), i, j)
                break 
            }

            j++
        }
    } 

    if(piecePosition.getLine() > 0 && piecePosition.getColumn() > 0){

        var j = piecePosition.getColumn() - 1
        for(var i = piecePosition.getLine() - 1; i >= 0; i--){

            putValueOnThreatBoard(threatBoard, new Position(i, j), board.getSquareByPosition(piecePosition).getColor())
            
            if(j == 0 || board.hasPiece(i, j)){
                setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), i, j)
                break 
            }

            j--
        }
    }
}

function rookPopulateThreadBoard(board, threatBoard, piecePosition){

    if(piecePosition.getLine() < 7){
        for(var i = piecePosition.getLine() + 1; i <= 7; i++){
            putValueOnThreatBoard(threatBoard, new Position(i, piecePosition.getColumn()), board.getSquareByPosition(piecePosition).getColor())

            if(board.hasPiece(i, piecePosition.getColumn())){
                setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), i, piecePosition.getColumn())
                break
            }
        }
    }

    if(piecePosition.getLine() > 0){
        for(var i = piecePosition.getLine() - 1; i >= 0; i--){
            putValueOnThreatBoard(threatBoard, new Position(i, piecePosition.getColumn()), board.getSquareByPosition(piecePosition).getColor())

            if(board.hasPiece(i, piecePosition.getColumn())){
                setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), i, piecePosition.getColumn())
                break
            }
        }
    }

    if(piecePosition.getColumn() < 7){
        for(var i = piecePosition.getColumn() + 1; i <= 7; i++){
            putValueOnThreatBoard(threatBoard, new Position(piecePosition.getLine(), i), board.getSquareByPosition(piecePosition).getColor())

            if(board.hasPiece(piecePosition.getLine(), i)){
                setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), piecePosition.getLine(), i)
                break
            }
        }
    }

    if(piecePosition.getColumn() > 0){
        for(var i = piecePosition.getColumn() - 1; i >= 0; i--){
            putValueOnThreatBoard(threatBoard, new Position(piecePosition.getLine(), i), board.getSquareByPosition(piecePosition).getColor())

            if(board.hasPiece(piecePosition.getLine(), i)){
                setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), piecePosition.getLine(), i)
                break
            }
        }
    }
}

function whitePawnPopulateThreadBoard(board, threatBoard, piecePosition){

    var threatLineSquare
    var threatColumnSquare

    if((piecePosition.getColumn() != 0) && (piecePosition.getColumn() != 7)){

        threatLineSquare = piecePosition.getLine() - 1
        threatColumnSquare = piecePosition.getColumn() - 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)

        threatColumnSquare = piecePosition.getColumn() + 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)

    }else if(piecePosition.getColumn() == 0){

        threatLineSquare = piecePosition.getLine() - 1
        threatColumnSquare = piecePosition.getColumn() + 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }else if (piecePosition.getColumn() == 7){

        threatLineSquare = piecePosition.getLine() - 1
        threatColumnSquare = piecePosition.getColumn() - 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }
}

function blackPawnPopulateThreadBoard(board, threatBoard, piecePosition){
    var threatLineSquare
    var threatColumnSquare

    if((piecePosition.getColumn() != 0) && (piecePosition.getColumn() != 7)){

        threatLineSquare = piecePosition.getLine() + 1
        threatColumnSquare = piecePosition.getColumn() - 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)

        threatColumnSquare = piecePosition.getColumn() + 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }else if(piecePosition.getColumn() == 0){

        threatLineSquare = piecePosition.getLine() + 1
        threatColumnSquare = piecePosition.getColumn() + 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }else if (piecePosition.getColumn() == 7){

        threatLineSquare = piecePosition.getLine() + 1
        threatColumnSquare = piecePosition.getColumn() - 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }
}

function queenPopulateThreadBoard(board, threatBoard, piecePosition){
   
    bishopPopulateThreadBoard(board, threatBoard, piecePosition)
    rookPopulateThreadBoard(board, threatBoard, piecePosition)
}

function kingPopulateThreadBoard(board, threatBoard, piecePosition){
    
    var threatLineSquare
    var threatColumnSquare
    
    if((piecePosition.getLine() < 7) && (piecePosition.getColumn() > 0)){
        threatLineSquare = piecePosition.getLine() + 1
        threatColumnSquare = piecePosition.getColumn() - 1
        putKingValuesOnThreatBoard(board.getSquareByPosition(piecePosition).getColor(), threatBoard, threatLineSquare, threatColumnSquare, piecePosition)
    }
    
    if((piecePosition.getColumn() > 0)){
        threatLineSquare = piecePosition.getLine()
        threatColumnSquare = piecePosition.getColumn() - 1
        putKingValuesOnThreatBoard(board.getSquareByPosition(piecePosition).getColor(), threatBoard, threatLineSquare, threatColumnSquare, piecePosition)
    }

    if((piecePosition.getLine() > 0) && (piecePosition.getColumn() > 0)){
        threatLineSquare = piecePosition.getLine() - 1
        threatColumnSquare = piecePosition.getColumn() - 1
        putKingValuesOnThreatBoard(board.getSquareByPosition(piecePosition).getColor(), threatBoard, threatLineSquare, threatColumnSquare, piecePosition)
    }        

    if((piecePosition.getLine() > 0)){
        threatLineSquare = piecePosition.getLine() - 1
        threatColumnSquare = piecePosition.getColumn()
        putKingValuesOnThreatBoard(board.getSquareByPosition(piecePosition).getColor(), threatBoard, threatLineSquare, threatColumnSquare, piecePosition)
    }        

    if((piecePosition.getLine() > 0) && (piecePosition.getColumn() < 7)){
        threatLineSquare = piecePosition.getLine() - 1
        threatColumnSquare = piecePosition.getColumn() + 1
        putKingValuesOnThreatBoard(board.getSquareByPosition(piecePosition).getColor(), threatBoard, threatLineSquare, threatColumnSquare, piecePosition)
    }    

    if((piecePosition.getColumn() < 7)){
        threatLineSquare = piecePosition.getLine()
        threatColumnSquare = piecePosition.getColumn() + 1
        putKingValuesOnThreatBoard(board.getSquareByPosition(piecePosition).getColor(), threatBoard, threatLineSquare, threatColumnSquare, piecePosition)
    }

    if((piecePosition.getLine() < 7) && (piecePosition.getColumn() < 7)){
        threatLineSquare = piecePosition.getLine() + 1
        threatColumnSquare = piecePosition.getColumn() + 1
        putKingValuesOnThreatBoard(board.getSquareByPosition(piecePosition).getColor(), threatBoard, threatLineSquare, threatColumnSquare, piecePosition)
    }    

    if((piecePosition.getLine() < 7)){
        threatLineSquare = piecePosition.getLine() + 1
        threatColumnSquare = piecePosition.getColumn()
        putKingValuesOnThreatBoard(board.getSquareByPosition(piecePosition).getColor(), threatBoard, threatLineSquare, threatColumnSquare, piecePosition)
    }

}

function knightPopulateThreadBoard(board, threatBoard, piecePosition){
    
    var threatLineSquare
    var threatColumnSquare
    
    if((piecePosition.getLine() < 6) && (piecePosition.getColumn() > 0)){
        threatLineSquare = piecePosition.getLine() + 2
        threatColumnSquare = piecePosition.getColumn() - 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }
    
    if((piecePosition.getLine() < 6) && (piecePosition.getColumn() > 1)){
        threatLineSquare = piecePosition.getLine() + 1
        threatColumnSquare = piecePosition.getColumn() - 2
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }

    if((piecePosition.getLine() > 0) && (piecePosition.getColumn() > 1)){
        threatLineSquare = piecePosition.getLine() - 1
        threatColumnSquare = piecePosition.getColumn() - 2
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }    

    if((piecePosition.getLine() > 1) && (piecePosition.getColumn() > 0)){
        threatLineSquare = piecePosition.getLine() - 2
        threatColumnSquare = piecePosition.getColumn() - 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }        

    if((piecePosition.getLine() > 1) && (piecePosition.getColumn() < 7)){
        threatLineSquare = piecePosition.getLine() - 2
        threatColumnSquare = piecePosition.getColumn() + 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }        

    if((piecePosition.getLine() > 0) && (piecePosition.getColumn() < 6)){
        threatLineSquare = piecePosition.getLine() - 1
        threatColumnSquare = piecePosition.getColumn() + 2
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }    

    if((piecePosition.getLine() < 7) && (piecePosition.getColumn() < 6)){
        threatLineSquare = piecePosition.getLine() + 1
        threatColumnSquare = piecePosition.getColumn() + 2
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }    

    if((piecePosition.getLine() < 6) && (piecePosition.getColumn() < 7)){
        threatLineSquare = piecePosition.getLine() + 2
        threatColumnSquare = piecePosition.getColumn() + 1
        putValueOnThreatBoard(threatBoard, new Position(threatLineSquare, threatColumnSquare), board.getSquareByPosition(piecePosition).getColor())
        setPiecesThatAreChecking(board, piecePosition.getLine(), piecePosition.getColumn(), threatLineSquare, threatColumnSquare)
    }
}


module.exports = ThreatBoardService

function  putValueOnThreatBoard(threatBoard, position, color){
    
    if(threatBoard.getSquareByPosition(position) == 0){
        if(color == 'white'){
            threatBoard.putValueOnBoardByPosition(position, 1)
        }else{
            threatBoard.putValueOnBoardByPosition(position, 2)
        }
    }else if(threatBoard.getSquareByPosition(position) == 1){
        if(color == 'black'){
            threatBoard.putValueOnBoardByPosition(position, 3)
        }
    }else if(threatBoard.getSquareByPosition(position) == 2){
        if(color == 'white'){
            threatBoard.putValueOnBoardByPosition(position, 3)
        }
    }else if(threatBoard.getSquareByPosition(position) == 4){
        if(color == 'black'){
            threatBoard.putValueOnBoardByPosition(position, 6)
        }
    }else if(threatBoard.getSquareByPosition(position) == 5){
        if(color == 'white'){
            threatBoard.putValueOnBoardByPosition(position, 7)
        }
    }

}

function putKingValuesOnThreatBoard(color, threatBoard, threatLineSquare, threatColumnSquare, move){

    if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 0){
        if(color == 'white'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 4)
        }else{
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 5)
        }
    }
    if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 1){
        if(color == 'black'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 6)
        }
    }else if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 2){
        if(color == 'white'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 7)
        }
    }

}

