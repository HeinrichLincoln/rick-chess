const Piece = require('./piece')

class Board {
    constructor() { 
        this.board = /*[[new Piece('R', 'black'), new Piece('N', 'black'), new Piece('B', 'black'), new Piece('Q', 'black'), new Piece('K', 'black'), new Piece('B', 'black'), new Piece('N', 'black'), new Piece('R', 'black')],
                        [new Piece('p', 'black'), new Piece('p', 'black'), new Piece('p', 'black'), new Piece('p', 'black'), new Piece('p', 'black'), new Piece('p', 'black'), new Piece('p', 'black'), new Piece('p', 'black')],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [new Piece('P', 'white'), new Piece('P', 'white'), new Piece('P', 'white'), new Piece('P', 'white'), new Piece('P', 'white'), new Piece('P', 'white'), new Piece('P', 'white'), new Piece('P', 'white')],
                        [new Piece('R', 'white'), new Piece('N', 'white'), new Piece('B', 'white'), new Piece('Q', 'white'), new Piece('K', 'white'), new Piece('B', 'white'), new Piece('N', 'white'), new Piece('R', 'white')],
                    ]*/
                    [
                    [null, new Piece('K', 'black'), null, null, null, null, null, null],
                    [new Piece('R', 'white'), null, null, null, null, null, null, new Piece('Q', 'white')],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null],
                    [null, null, null, null, null, new Piece('R', 'white'),null, null],
                    ] 
    }

    
    putPieceOnBoard(i, j, piece) {
        this.board[i][j] = piece
    }

    removePieceFromBoard(i, j) {
        this.board[i][j] = null
    }

    getBoard() {
        return this.board
    }

    getSquare(i, j){
        return this.board[i][j]
    }

    setBoard(newBoard){
        this.board = newBoard
    }

    hasPiece(i, j) {
        if(this.board[i][j]){
            return true
        }
        return false
    }

}

module.exports = Board