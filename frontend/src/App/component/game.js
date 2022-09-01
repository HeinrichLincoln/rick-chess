import React from "react"
import boardModel from "../../models/board"
import Board from "./board"
import Button from "./button"
import Reset from "./reset"

class Game extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            board: new boardModel(),
            history: [new boardModel()],
            isBoardInLastPosition: true,
        }            
    }

    renderButton(i, status){
        return <Button
            onClick={() => this.onClick(i)}
            status={status}
        ></Button>
    }

    renderResetButton(){
        return <Reset
            reset ={() => this.reset()}
        ></Reset>
    }

    addButton(){
        var allButtons = []
        var status
        
        for(var i= 0; i <= (this.state.history.length - 1); i++){
            if(i == 0){
                status = 'Posiçao inicial'
            }else{
                status = 'Rodada ' + i
            }
            allButtons.push(<div key={i}>{this.renderButton(i, status)}</div>) 
        }
        return allButtons
    }

    renderBoard() {
        return  <Board
                    board={this.state.board} 
                    implementingHistory={() => this.implementHistory()}
                    isBoardInLastPosition={this.state.isBoardInLastPosition}
                ></Board>
    }

    implementHistory() {
        var boardCopy = new boardModel()
        var arrarCopy = this.state.board.getBoard().map((x) => ([...x])) 
        boardCopy.setBoard(arrarCopy)
        var implementHistory = this.state.history
        implementHistory.push(boardCopy)
        this.setState({history: implementHistory})
    }

    onClick(i) {
        this.setState({isBoardInLastPosition: false})
        if(i + 1 == this.state.history.length){
            this.setState({isBoardInLastPosition: true})
        }
        var historyCopy = new boardModel()
        var arrarCopy = this.state.history[i].getBoard().map((x) => ([...x])) 
        historyCopy.setBoard(arrarCopy)
        this.setState({board: historyCopy})
    }

    reset(){
        this.setState({board: new boardModel()})

        var resetArray = [new boardModel()]
        this.setState({history: resetArray})
        this.setState({isBoardInLastPosition: true})

        console.log(this.state.board)
    }
 
    render(){
        return (
            <div className="float-container">
                <div className="div-inline">{this.renderBoard()} </div> 
                <div className="div-inline-history"  style={{overflowY: 'auto', maxHeight: '272px'}}>{this.addButton()}</div>
                <div className="div-above">{this.renderResetButton()}</div>
            </div>
        )
    }

}

export default Game