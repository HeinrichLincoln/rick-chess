import React from "react"
import Square from "./square"
import { faChessBishop, faChessKnight, faChessPawn, faChessRook, faChessQueen, faChessKing } from "@fortawesome/free-solid-svg-icons"
import apiService from "../service/api"
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers"

class Board extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            keepPiece: null,
            initialLinePosition: null,
            initialColumnPosition: null,
            verified: false
        }            
    }
    renderSquare(i, j) {
        return <Square
                       value = {this.getPiecesSymbolsFromBoard(i, j)}
                       className = {this.squareColor(i, j)}
                       realizeMovement = {() => this.realizeMovement(i, j)}
                       icon = {this.renderIcon(i, j)}
                       ></Square>
    }

    squareColor(i, j) {
        var squareColor = "squareColor2"
            if((i + j) % 2 === 0){
                squareColor = "squareColor1"
            }
            return squareColor
    }

    renderIcon(i, j){

        var icon = ''
        var colorIcon = null

        if(this.props.board.getSquare(i, j) != null){
            switch (this.props.board.getSquare(i, j).getSymbol()) {
                case 'Q':
                    icon = faChessQueen
                    colorIcon = 'blackiconcolor'
                    break;
                case 'K':
                    icon = faChessKing
                    colorIcon = 'blackiconcolor'
                    break;
                case 'R':
                    icon = faChessRook
                    colorIcon = 'blackiconcolor'
                    break;
                case 'B':
                    icon = faChessBishop
                    colorIcon = 'blackiconcolor'
                    break;
                case 'N':
                    icon = faChessKnight
                    colorIcon = 'blackiconcolor'
                    break;
                case 'P':
                    icon = faChessPawn
                    colorIcon = 'blackiconcolor'
                    break;
                case 'r':
                    icon = faChessRook
                    colorIcon = 'whiteiconcolor'
                    break;
                case 'q':
                    icon = faChessQueen
                    colorIcon = 'whiteiconcolor'
                    break;
                case 'k':
                    icon = faChessKing
                    colorIcon = 'whiteiconcolor'
                    break;
                case 'b':
                    icon = faChessBishop
                    colorIcon = 'whiteiconcolor'
                    break;
                case 'n':
                    icon = faChessKnight
                    colorIcon = 'whiteiconcolor'
                    break;
                case 'p':
                    icon = faChessPawn
                    colorIcon = 'whiteiconcolor'
                    break;

                default:                    
                    break;
            }
        }
        var iconJSON = {
            icon: icon,
            colorIcon: colorIcon
        }

        return iconJSON
    }

    getPiecesSymbolsFromBoard(i, j){

        var value

        if(this.props.board.getSquare(i, j) == null){
            value = null
        }else{
            value = this.props.board.getSquare(i, j).getSymbol()
        }
        return value
    }

    verifyIfMoveWillBeRealized(line, column){

        if(this.state.keepPiece == null){
            if(this.props.board.getSquare(line, column) != null){

                this.setState({initialLinePosition : line})
                this.setState({initialColumnPosition : column})
                this.setState({verified: true})

            }
        }else{

            var body = {
                initialLinePosition: this.state.initialLinePosition,
                initialColumnPosition: this.state.initialColumnPosition,
                finalLinePosition: line,
                finalColumnPosition: column
            }

            apiService.post('/movement', body)
                //.then(res => console.log(res.data))
                .then((res) => {
                    if(res.data != 'OK'){
                        this.props.board.putPieceOnBoard(this.state.initialLinePosition, this.state.initialColumnPosition, this.state.keepPiece)
                        this.setState({keepPiece: null})
                        this.setState({initialLinePosition : null})
                        this.setState({initialColumnPosition : null})
                        this.setState({verified: false})
                    }else{
                        this.setState({verified: true}) 
                    }
                })
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });          
        }
    }

    realizeMovement(i, j){

        if(!this.props.isBoardInLastPosition){
            return
        }

        this.verifyIfMoveWillBeRealized(i, j)

        if(this.state.verified == false){
            return
        }
        
        if(this.state.keepPiece == null){
            if(this.props.board.getSquare(i, j) != null){
                this.setState({keepPiece : this.props.board.getSquare(i, j)})
                this.props.board.removePieceFromBoard(i, j)
                this.setState({verified: false})
            }
        }else{
            this.props.board.putPieceOnBoard(i, j, this.state.keepPiece)
            this.setState({keepPiece : null})
            this.props.implementingHistory() 
        }
    }

    render(){
        return (
            <div>
                <div className='board-row'>
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(0, 3)}
                    {this.renderSquare(0, 4)}
                    {this.renderSquare(0, 5)}
                    {this.renderSquare(0 ,6)}
                    {this.renderSquare(0, 7)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(1, 4)}
                    {this.renderSquare(1, 5)}
                    {this.renderSquare(1 ,6)}
                    {this.renderSquare(1, 7)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(2, 4)}
                    {this.renderSquare(2, 5)}
                    {this.renderSquare(2 ,6)}
                    {this.renderSquare(2, 7)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3, 0)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(3, 5)}
                    {this.renderSquare(3 ,6)}
                    {this.renderSquare(3, 7)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(4, 0)}
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(4, 4)}
                    {this.renderSquare(4, 5)}
                    {this.renderSquare(4 ,6)}
                    {this.renderSquare(4, 7)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(5, 0)}
                    {this.renderSquare(5, 1)}
                    {this.renderSquare(5, 2)}
                    {this.renderSquare(5, 3)}
                    {this.renderSquare(5, 4)}
                    {this.renderSquare(5, 5)}
                    {this.renderSquare(5 ,6)}
                    {this.renderSquare(5, 7)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6, 0)}
                    {this.renderSquare(6, 1)}
                    {this.renderSquare(6, 2)}
                    {this.renderSquare(6, 3)}
                    {this.renderSquare(6, 4)}
                    {this.renderSquare(6, 5)}
                    {this.renderSquare(6 ,6)}
                    {this.renderSquare(6, 7)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(7, 0)}
                    {this.renderSquare(7, 1)}
                    {this.renderSquare(7, 2)}
                    {this.renderSquare(7, 3)}
                    {this.renderSquare(7, 4)}
                    {this.renderSquare(7, 5)}
                    {this.renderSquare(7 ,6)}
                    {this.renderSquare(7, 7)}
                </div>
            </div>
        ) 
    }
}
export default Board