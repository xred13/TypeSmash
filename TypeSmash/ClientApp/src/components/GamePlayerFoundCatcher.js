import React, {Component} from "react";

export default class GamePlayerFoundCatcher extends Component{

    state = {
        receivedText: ""
    }

    addWordToState = (word) => {
        this.setState({receivedText: this.state.receivedText + " " + word});
    }


    render(){

        return(
            <div>
                {this.state.receivedText}
            </div>
        );
    }
}