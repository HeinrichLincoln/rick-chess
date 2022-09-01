class ThreatBoard {
    constructor(){
        this.board = [[0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0]]
    }

    putValueOnBoard(i, j, value) {
        this.board[i][j] = value
    }

    putValueOnBoardByPosition(position, value){
        this.board[position.getLine()][position.getColumn()] = value
    }

    removeValueFromBoard(i, j) {
        this.board[i][j] = null
    }

    getBoard() {
        return this.board
    }

    getSquare(i, j){
        return this.board[i][j]
    }

    getSquareByPosition(position){
        return this.board[position.getLine()][position.getColumn()]
    }

    setBoard(newBoard){
        this.board = newBoard
    }    
}

module.exports = ThreatBoard