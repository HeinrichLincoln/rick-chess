class Position{
    constructor(line, column){
        this.line = line
        this.column = column
    }

    getLine(){
        return this.line
    }

    getColumn(){
        return this.column
    }
}

module.exports = Position