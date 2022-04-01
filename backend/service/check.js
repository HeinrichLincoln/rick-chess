const THREAT_TYPE = require('../enums/status')
const ThreatBoard = require('../models/boardThreat')

function putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare){

    if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 0){
        if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 1)
        }else{
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 2)
        }
    }else if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 1){
        if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'black'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 3)
        }
    }else if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 2){
        if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 3)
        }
    }else if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 4){
        if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'black'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 6)
        }
    }else if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 5){
        if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 7)
        }
    }
}

function putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare){
    if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 0){
        if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 4)
        }else{
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 5)
        }
    }
    if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 1){
        if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'black'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 6)
        }
    }else if(threatBoard.getSquare(threatLineSquare, threatColumnSquare) == 2){
        if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){
            threatBoard.putValueOnBoard(threatLineSquare, threatColumnSquare, 7)
        }
    }
}

function setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, i, j){

    if(board.getSquare(i, j)){
        if(board.getSquare(i, j).getSymbol() == 'K'){
            if(board.getSquare(i, j).getColor() == 'white'){
                if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'black'){
                    board.getSquare(initialLinePosition, initialColumnPosition).setChecking(true)
                }
            }else 
                if(board.getSquare(i, j).getColor() == 'black'){
                    if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){
                        board.getSquare(initialLinePosition, initialColumnPosition).setChecking(true)
                    }
                }
        }
    }
}

function haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, color){
    
    var pieceAtacking = color === 'white' ? THREAT_TYPE.whitePieceIsAtacking : THREAT_TYPE.blackPieceIsAtacking
    var kingAndPieceAtacking = color === 'white' ? THREAT_TYPE.whiteKingAtacking :THREAT_TYPE.blackKingAtacking
    var kingAtacking = color === 'white' ? THREAT_TYPE.whiteKingAtacking : THREAT_TYPE.blackKingAtacking

    if((board.getSquare(hasExitLineSquare, hasExitColumnSquare) == null) || board.getSquare(hasExitLineSquare, hasExitColumnSquare).getColor() != color){
        if(threatBoard.getSquare(hasExitLineSquare, hasExitColumnSquare) == pieceAtacking || threatBoard.getSquare(hasExitLineSquare, hasExitColumnSquare) == kingAndPieceAtacking || threatBoard.getSquare(hasExitLineSquare, hasExitColumnSquare) == 0 || threatBoard.getSquare(hasExitLineSquare, hasExitColumnSquare) == kingAtacking){
            kinghaveScape = true
        }
    }
return kinghaveScape
}

function pieceCheckingCanBeEaten(board, threatBoard, color, checkingPieceCanBeEaten){


    var pieceCheckingLinePosition = null
    var pieceCheckingColumnPosition = null

    var kingAtacking = color === 'black' ? THREAT_TYPE.whiteKingAtacking : THREAT_TYPE.blackKingAtacking
    var pieceAtacking = color === 'black' ? THREAT_TYPE.whitePieceAtacking : THREAT_TYPE.blackPieceAtacking
    var kingAndPieceAtacking = color === 'black' ? THREAT_TYPE.blackKingAndWhitePieceAtacking :THREAT_TYPE.whiteKingAndBlackPieceAtacking

    for(var i = 0; i <= 7; i++){
        for(var j = 0; j <= 7; j++){

            if(board.getSquare(i, j)){
                if(board.getSquare(i, j).isPieceChecking() == true){
                    if(pieceCheckingColumnPosition == null){
                        pieceCheckingLinePosition = i
                        pieceCheckingColumnPosition = j

                        if((threatBoard.getSquare(pieceCheckingLinePosition, pieceCheckingColumnPosition) == pieceAtacking) || (threatBoard.getSquare(pieceCheckingLinePosition, pieceCheckingColumnPosition) == kingAndPieceAtacking || (threatBoard.getSquare(pieceCheckingLinePosition, pieceCheckingColumnPosition) == 3)) || threatBoard.getSquare(pieceCheckingLinePosition, pieceCheckingColumnPosition) == kingAtacking){
                            checkingPieceCanBeEaten = true
                        }
                    }else{
                        checkingPieceCanBeEaten = false
                    }
                }
            }

        }
    }
    return checkingPieceCanBeEaten
}

function verifyIfIsCheckMate(board, threatBoard, color, somePieceCanEnterInFrontOf){

    var checkMate

    var kingAndPieceAtacking = color === 'white' ? THREAT_TYPE.whiteKingAtacking :THREAT_TYPE.blackKingAtacking

    var pieceCheckingLinePosition = null
    var pieceCheckingColumnPosition = null

            for(var i = 0; i <= 7; i++){
                for(var j = 0; j <= 7; j++){
        
                    if(board.getSquare(i, j)){
                        if(pieceCheckingColumnPosition == null){
                            if(board.getSquare(i, j).isPieceChecking() == true){
                                pieceCheckingLinePosition = i
                                pieceCheckingColumnPosition = j
                            }
                            else if(threatBoard.getSquare(i, j) == kingAndPieceAtacking){
                                checkMate = true
                                return checkMate
                            }
                        }
                    }
                }
            }

            var kingLinePosition = null
            var kingColumnPosition = null

            for(var i = 0; i <= 7; i++){
                for(var j = 0; j <= 7; j++){

                    if(board.getSquare(i, j)){
                        if(board.getSquare(i, j).getSymbol() == 'K'){
                            if(board.getSquare(i, j).getColor() != color){

                                kingLinePosition = i
                                kingColumnPosition = j

                            }
                        }
                    }

                }
            }


            var initialLine
            var finalLine
            if(pieceCheckingLinePosition > kingLinePosition){
                initialLine = kingLinePosition
                finalLine = pieceCheckingLinePosition
            }else if(pieceCheckingLinePosition < kingLinePosition){
                initialLine = pieceCheckingLinePosition
                finalLine = kingLinePosition
            }else{
                initialLine = pieceCheckingLinePosition
                finalLine = initialLine
            }

            var initialColumn
            var finalColumn

            if(pieceCheckingColumnPosition > kingColumnPosition){
                initialColumn = kingColumnPosition
                finalColumn = pieceCheckingColumnPosition
            }else if(pieceCheckingColumnPosition < kingColumnPosition){
                initialColumn = pieceCheckingColumnPosition
                finalColumn = kingColumnPosition
            }else{
                initialColumn = pieceCheckingColumnPosition
                finalColumn = initialColumn
            }

            var thisPieceIsAKing = false

            for(var i = initialLine; i <= finalLine; i++){
                for(var j = initialColumn; j <= finalColumn; j++){

                    if(board.getSquare(i, j)){    
                        if(board.getSquare(i, j).getSymbol() != 'K'){
                            thisPieceIsAKing = true
                        }else{
                            thisPieceIsAKing = false
                        }
                    }else{
                        thisPieceIsAKing = false
                    }

                    if(thisPieceIsAKing == false){
                        if(threatBoard.getSquare(i, j) == THREAT_TYPE.bothColorsAtacking){
                            somePieceCanEnterInFrontOf = true
                            break
                        }
                    }

                }
            }

            if(somePieceCanEnterInFrontOf == false){
                checkMate = true
            }else{
                checkMate = false
            }
    return checkMate
}

const verifyThreat = {
    verifyThreatBishop : function verifyThreatBishop(board, initialLinePosition, initialColumnPosition, threatBoard){


        if(initialLinePosition <  7 && initialColumnPosition  > 0){

            var j = initialColumnPosition - 1
            for(var i = initialLinePosition + 1; i <= 7; i++){

                putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, i, j)
                
                if(j == 0 || board.hasPiece(i, j)){
                    setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, i, j)
                    break 
                }

                j--
            }
        }

        if(initialLinePosition <  7 && initialColumnPosition  < 7){

            var j = initialColumnPosition + 1
            for(var i = initialLinePosition + 1; i <= 7; i++){

                putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, i, j)

                if(j == 0 || board.hasPiece(i, j)){
                    setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, i, j)
                    break 
                }
                
                j++
            }
        }
        
        if(initialLinePosition >  0 && initialColumnPosition  < 7){


            var j = initialColumnPosition + 1
            for(var i = initialLinePosition - 1; i >= 0; i--){

                putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, i, j)

                if(j == 7 || board.hasPiece(i, j)){
                    setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, i, j)
                    break 
                }

                j++
            }
        } 

        if(initialLinePosition > 0 && initialColumnPosition > 0){

            var j = initialColumnPosition - 1
            for(var i = initialLinePosition - 1; i >= 0; i--){

                putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, i, j)
                
                if(j == 0 || board.hasPiece(i, j)){
                    setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, i, j)
                    break 
                }

                j--
            }
        }
    },
    
    verifyThreatRook : function verifyThreatRook(board, initialLinePosition, initialColumnPosition, threatBoard){

        if(initialLinePosition < 7){
            for(var i = initialLinePosition + 1; i <= 7; i++){
                putValueOnThreatBoard(board,initialLinePosition, initialColumnPosition, threatBoard, i, initialColumnPosition)

                if(board.hasPiece(i, initialColumnPosition)){
                    setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, i, initialColumnPosition)
                    break
                }
            }
        }

        if(initialLinePosition > 0){
            for(var i = initialLinePosition - 1; i >= 0; i--){
                putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, i, initialColumnPosition)

                if(board.hasPiece(i, initialColumnPosition)){
                    setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, i, initialColumnPosition)
                    break
                }
            }
        }

        if(initialColumnPosition < 7){
            for(var i = initialColumnPosition + 1; i <= 7; i++){
                putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, initialLinePosition, i)

                if(board.hasPiece(initialLinePosition, i)){
                    setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, initialLinePosition, i)
                    break
                }
            }
        }

        if(initialColumnPosition > 0){
            for(var i = initialColumnPosition - 1; i >= 0; i--){
                putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, initialLinePosition, i)

                if(board.hasPiece(initialLinePosition, i)){
                    setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, initialLinePosition, i)
                    break
                }
            }
        }
    },

    verifyThreatWhitePawn : function verifyThreatWhitePawn(board, initialLinePosition, initialColumnPosition, threatBoard){

        var threatLineSquare
        var threatColumnSquare

        if((initialColumnPosition != 0) && (initialColumnPosition != 7)){

            threatLineSquare = initialLinePosition - 1
            threatColumnSquare = initialColumnPosition - 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)

            threatColumnSquare = initialColumnPosition + 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)

        }else if(initialColumnPosition == 0){

            threatLineSquare = initialLinePosition - 1
            threatColumnSquare = initialColumnPosition + 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }else if (initialColumnPosition == 7){

            threatLineSquare = initialLinePosition - 1
            threatColumnSquare = initialColumnPosition - 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }
    },

    verifyThreatBlackPawn : function verifyThreatBlackPawn(board, initialLinePosition, initialColumnPosition, threatBoard){
        var threatLineSquare
        var threatColumnSquare

        if((initialColumnPosition != 0) && (initialColumnPosition != 7)){

            threatLineSquare = initialLinePosition + 1
            threatColumnSquare = initialColumnPosition - 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)

            threatColumnSquare = initialColumnPosition + 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }else if(initialColumnPosition == 0){

            threatLineSquare = initialLinePosition + 1
            threatColumnSquare = initialColumnPosition + 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }else if (initialColumnPosition == 7){

            threatLineSquare = initialLinePosition + 1
            threatColumnSquare = initialColumnPosition - 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }
    },

    verifyThreatQueen: function verifyThreatQueen(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare){
       
        verifyThreat.verifyThreatBishop(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        verifyThreat.verifyThreatRook(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
    },
    
    verifyThreatKing: function verifyThreatKing(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare){
        
        var threatLineSquare
        var threatColumnSquare
        
        if((initialLinePosition < 7) && (initialColumnPosition > 0)){
            threatLineSquare = initialLinePosition + 1
            threatColumnSquare = initialColumnPosition - 1
            putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        }
        
        if((initialColumnPosition > 0)){
            threatLineSquare = initialLinePosition
            threatColumnSquare = initialColumnPosition - 1
            putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        }

        if((initialLinePosition > 0) && (initialColumnPosition > 0)){
            threatLineSquare = initialLinePosition - 1
            threatColumnSquare = initialColumnPosition - 1
            putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        }        

        if((initialLinePosition > 0)){
            threatLineSquare = initialLinePosition - 1
            threatColumnSquare = initialColumnPosition
            putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        }        

        if((initialLinePosition > 0) && (initialColumnPosition < 7)){
            threatLineSquare = initialLinePosition - 1
            threatColumnSquare = initialColumnPosition + 1
            putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        }    

        if((initialColumnPosition < 7)){
            threatLineSquare = initialLinePosition
            threatColumnSquare = initialColumnPosition + 1
            putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        }

        if((initialLinePosition < 7) && (initialColumnPosition < 7)){
            threatLineSquare = initialLinePosition + 1
            threatColumnSquare = initialColumnPosition + 1
            putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        }    

        if((initialLinePosition < 7)){
            threatLineSquare = initialLinePosition + 1
            threatColumnSquare = initialColumnPosition
            putKingValuesOnly(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
        }

    },
    verifyThreatknight: function verifyThreatknight(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare){
        
        var threatLineSquare
        var threatColumnSquare
        
        if((initialLinePosition < 6) && (initialColumnPosition > 0)){
            threatLineSquare = initialLinePosition + 2
            threatColumnSquare = initialColumnPosition - 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }
        
        if((initialLinePosition < 6) && (initialColumnPosition > 1)){
            threatLineSquare = initialLinePosition + 1
            threatColumnSquare = initialColumnPosition - 2
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }

        if((initialLinePosition > 0) && (initialColumnPosition > 1)){
            threatLineSquare = initialLinePosition - 1
            threatColumnSquare = initialColumnPosition - 2
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }    

        if((initialLinePosition > 1) && (initialColumnPosition > 0)){
            threatLineSquare = initialLinePosition - 2
            threatColumnSquare = initialColumnPosition - 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }        

        if((initialLinePosition > 1) && (initialColumnPosition < 7)){
            threatLineSquare = initialLinePosition - 2
            threatColumnSquare = initialColumnPosition + 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }        

        if((initialLinePosition > 0) && (initialColumnPosition < 6)){
            threatLineSquare = initialLinePosition - 1
            threatColumnSquare = initialColumnPosition + 2
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }    

        if((initialLinePosition < 7) && (initialColumnPosition < 6)){
            threatLineSquare = initialLinePosition + 1
            threatColumnSquare = initialColumnPosition + 2
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }    

        if((initialLinePosition < 6) && (initialColumnPosition < 7)){
            threatLineSquare = initialLinePosition + 2
            threatColumnSquare = initialColumnPosition + 1
            putValueOnThreatBoard(board, initialLinePosition, initialColumnPosition, threatBoard, threatLineSquare, threatColumnSquare)
            setPiecesThatAreChecking(board, initialLinePosition, initialColumnPosition, threatLineSquare, threatColumnSquare)
        }
    },
    

}

const putThreat = {
    putThreatOnBoard: function threatOnBoard(board, threatBoard){

        for(var i = 0; i <= 7; i++){
            for(var j = 0; j <= 7; j++){
                if(board.getSquare(i, j)){
                    switch (board.getSquare(i, j).getSymbol()) {
                        case 'B':
                            verifyThreat.verifyThreatBishop(board, i, j, threatBoard)
                            break;
                        case 'R':
                            verifyThreat.verifyThreatRook(board, i, j, threatBoard)
                            break;
                        case 'P':
                            verifyThreat.verifyThreatWhitePawn(board, i, j, threatBoard)
                            break;
                        case 'p':
                            verifyThreat.verifyThreatBlackPawn(board, i, j, threatBoard)
                            break;
                        case 'Q':
                            verifyThreat.verifyThreatQueen(board, i, j, threatBoard)
                            break;
                        case 'N':
                            verifyThreat.verifyThreatknight(board, i, j, threatBoard) 
                        break;
                        case 'K':
                            verifyThreat.verifyThreatKing(board, i, j, threatBoard)
                        break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}

const check = {

    isKingInCheck: function isKingInCheck(board, finalLinePosition, finalColumnPosition){

        var threatBoard = new ThreatBoard()

        var whiteKingInCheck = false
        var blackKingInCheck = false
        var mate = false

        putThreat.putThreatOnBoard(board, threatBoard)

        for(var i = 0; i <= 7; i++){
            for(var j = 0; j <= 7; j++){

                if(board.getSquare(i, j)){
                    if(board.getSquare(i, j).getSymbol() == 'K'){

                        if(board.getSquare(i, j).getColor() == 'white'){
                            if((threatBoard.getSquare(i, j) == 2) || (threatBoard.getSquare(i, j) == 3) || (threatBoard.getSquare(i, j) == 5)){
                                whiteKingInCheck = true
                                //whiteKingInCheckMate = checkMate.isCheckMate(board, threatBoard, finalLinePosition, finalColumnPosition)
                            }
                        }else{
                            if((threatBoard.getSquare(i, j) == 1) || (threatBoard.getSquare(i, j) == 3) || (threatBoard.getSquare(i, j) == 4)){
                                blackKingInCheck = true
                                //blackKingInCheckMate = checkMate.isCheckMate(board, threatBoard, finalLinePosition, finalColumnPosition)
                            }
                        }
                    }
                }

            }
        }

        var kingInCheck = {
            whiteKingInCheck,
            blackKingInCheck,
            mate
        }

        return kingInCheck
    }
}

const checkMate = {
    isCheckMate: function isCheckMate(board, threatBoard, initialLinePosition, initialColumnPosition) {

        var kinghaveScape = false
        var checkingPieceCanBeEaten = false
        var somePieceCanEnterInFrontOf = false
        var checkMate = false

        var threatBoard = new ThreatBoard()
        putThreat.putThreatOnBoard(board, threatBoard)

        var hasExitLineSquare
        var hasExitColumnSquare

            for(var i = 0; i <= 7; i++){
                for(var j = 0; j <= 7; j++){

                    if(board.getSquare(i, j)){
                        if(board.getSquare(i, j).getSymbol() == 'K'){
                            if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'white'){

                                if((initialLinePosition < 7) && (initialColumnPosition > 0)){
                                    hasExitLineSquare = initialLinePosition + 1
                                    hasExitColumnSquare = initialColumnPosition - 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'white')
                                }
                                
                                if((initialColumnPosition > 0)){
                                    hasExitLineSquare = initialLinePosition
                                    hasExitColumnSquare = initialColumnPosition - 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'white')
                                }
                    
                                if((initialLinePosition > 0) && (initialColumnPosition > 0)){
                                    hasExitLineSquare = initialLinePosition - 1
                                    hasExitColumnSquare = initialColumnPosition - 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'white')
                                }        
                    
                                if((initialLinePosition > 0)){
                                    hasExitLineSquare = initialLinePosition - 1
                                    hasExitColumnSquare = initialColumnPosition
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'white')
                                }        
                    
                                if((initialLinePosition > 0) && (initialColumnPosition < 7)){
                                    hasExitLineSquare = initialLinePosition - 1
                                    hasExitColumnSquare = initialColumnPosition + 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'white')
                                }    
                    
                                if((initialColumnPosition < 7)){
                                    hasExitLineSquare = initialLinePosition
                                    hasExitColumnSquare = initialColumnPosition + 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'white')
                                }
                    
                                if((initialLinePosition < 7) && (initialColumnPosition < 7)){
                                    hasExitLineSquare = initialLinePosition + 1
                                    hasExitColumnSquare = initialColumnPosition + 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'white')
                                }    
                    
                                if((initialLinePosition < 7)){
                                    hasExitLineSquare = initialLinePosition + 1
                                    hasExitColumnSquare = initialColumnPosition
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'white')
                                }

                                if(kinghaveScape == false){
                                    checkingPieceCanBeEaten = pieceCheckingCanBeEaten(board, threatBoard, 'white', checkingPieceCanBeEaten)
                                }

                                if(checkingPieceCanBeEaten == false){
                                    checkMate = verifyIfIsCheckMate(board, threatBoard, 'white', somePieceCanEnterInFrontOf)
                                }
                                
                            }else if(board.getSquare(initialLinePosition, initialColumnPosition).getColor() == 'black'){

                                if((initialLinePosition < 7) && (initialColumnPosition > 0)){
                                    hasExitLineSquare = initialLinePosition + 1
                                    hasExitColumnSquare = initialColumnPosition - 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'black')
                                }
                                
                                if((initialColumnPosition > 0)){
                                    hasExitLineSquare = initialLinePosition
                                    hasExitColumnSquare = initialColumnPosition - 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'black')
                                }
                        
                                if((initialLinePosition > 0) && (initialColumnPosition > 0)){
                                    hasExitLineSquare = initialLinePosition - 1
                                    hasExitColumnSquare = initialColumnPosition - 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'black')
                                }        
                        
                                if((initialLinePosition > 0)){
                                    hasExitLineSquare = initialLinePosition - 1
                                    hasExitColumnSquare = initialColumnPosition
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'black')
                                }        
                        
                                if((initialLinePosition > 0) && (initialColumnPosition < 7)){
                                    hasExitLineSquare = initialLinePosition - 1
                                    hasExitColumnSquare = initialColumnPosition + 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'black')
                                }    
                        
                                if((initialColumnPosition < 7)){
                                    hasExitLineSquare = initialLinePosition
                                    hasExitColumnSquare = initialColumnPosition + 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'black')
                                }
                        
                                if((initialLinePosition < 7) && (initialColumnPosition < 7)){
                                    hasExitLineSquare = initialLinePosition + 1
                                    hasExitColumnSquare = initialColumnPosition + 1
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'black')
                                }    
                        
                                if((initialLinePosition < 7)){
                                    hasExitLineSquare = initialLinePosition + 1
                                    hasExitColumnSquare = initialColumnPosition
                                    kinghaveScape = haveScapeToKing(board, hasExitLineSquare, hasExitColumnSquare, threatBoard, kinghaveScape, 'black')
                                }

                                if(kinghaveScape == false){
                                    checkingPieceCanBeEaten = pieceCheckingCanBeEaten(board, threatBoard, 'black', checkingPieceCanBeEaten)
                                }
                        
                                if(checkingPieceCanBeEaten == false){
                                    checkMate = verifyIfIsCheckMate(board, threatBoard, 'black', somePieceCanEnterInFrontOf)
                                }
                        
                            }
                        }
                    }
                }
            }
        return checkMate
    }
}  

module.exports = {
    check,
    checkMate
}