import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChess, faChessBishop, faChessKnight, faChessPawn, faChessRook, faChessQueen, faChessKing } from "@fortawesome/free-solid-svg-icons"


class Square extends React.Component{
    
    render(){
        return(
            <button 
                className={this.props.className}
                onClick={() => this.props.realizeMovement()}>
                <i className={this.props.icon.colorIcon}>
                    {this.props.icon.icon ? <FontAwesomeIcon icon= {this.props.icon.icon} />: ''}
                </i>
            </button>
        )
    }
}

export default Square