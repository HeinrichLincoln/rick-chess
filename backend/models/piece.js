class Piece {
    constructor(symbol, color){
        this.symbol = symbol
        this.color = color
        this.checking = false
    }

    getSymbol(){
        return this.symbol
    }

    getColor(){
        return this.color
    }

    isPieceChecking(){
        return this.checking
    }

    setChecking(check){
        this.checking = check
    }

}

module.exports = Piece