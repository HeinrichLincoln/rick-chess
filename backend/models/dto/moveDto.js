const Position = require('../position')

class MoveDto{
    constructor(move){
        this.initialPosition = new Position(move.initialLinePosition, move.initialColumnPosition)
        this.finalPostion = new Position(move.finalLinePosition, move.finalColumnPosition)
    }

    getInitialPosition(){
        return this.initialPosition
    }

    getFinalPosition(){
        return this.finalPostion
    }

}

module.exports = MoveDto