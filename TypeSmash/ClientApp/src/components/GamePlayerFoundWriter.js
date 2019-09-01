import React, {Component} from "react";

export default class GamePlayerRoleWriter extends Component{

    state = {
        writtenText : ""
    }

    keyPressed = (e) => {

        let props = this.props;
        let sendNewWrittenWord = props.sendNewWrittenWord;

        let spaceCharKeyCode = 32, enterKeyCode = 13;

        let charEnteredKeyCode = e.keyCode, inputText = e.target.value;
        let charEntered = String.fromCharCode(charEnteredKeyCode.toString());

        if (charEnteredKeyCode === spaceCharKeyCode){

            e.target.value = "";

            sendNewWrittenWord(inputText);
            this.setState({writtenText: this.state.writtenText + inputText});

        }
    }

    render(){
        return(
            <div>
                <div>
                    {this.state.writtenText}
                </div>
                <input type="text" onKeyUp={this.keyPressed} />
            </div>
        );
    }
}