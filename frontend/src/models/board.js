import Piece from "./piece";

class boardModel{
    constructor() {
        this.board = [[new Piece('R', 'black'), new Piece('N', 'black'), new Piece('B', 'black'), new Piece('Q', 'black'), new Piece('K', 'black'), new Piece('B', 'black'), new Piece('N', 'black'), new Piece('R', 'black')],
                        [new Piece('P', 'black'), new Piece('P', 'black'), new Piece('P', 'black'), new Piece('P', 'black'), new Piece('P', 'black'), new Piece('P', 'black'), new Piece('P', 'black'), new Piece('P', 'black')],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [new Piece('p', 'white'), new Piece('p', 'white'), new Piece('p', 'white'), new Piece('p', 'white'), new Piece('p', 'white'), new Piece('p', 'white'), new Piece('p', 'white'), new Piece('p', 'white')],
                        [new Piece('r', 'white'), new Piece('n', 'white'), new Piece('b', 'white'), new Piece('q', 'white'), new Piece('k', 'white'), new Piece('b', 'white'), new Piece('n', 'white'), new Piece('r', 'white')],
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
}



export default boardModel
