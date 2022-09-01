import React from "react";

    class Reset extends React.Component{
        render(){
            return(

                <button
                    onClick={() => this.props.reset()}
                >RESET GAME!!!</button>

            )
        }
    }

export default Reset