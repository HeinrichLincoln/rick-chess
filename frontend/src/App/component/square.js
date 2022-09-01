import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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