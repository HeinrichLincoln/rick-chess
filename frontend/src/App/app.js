import React from "react"
import Game from "./component/game";
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component{
    render(){
        return(
             <div className= "container"> 
                <div>
                    <div><Game></Game></div>
                </div>
             </div>
        )
    }
}

export default App 