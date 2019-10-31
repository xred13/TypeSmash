import React, {Component} from "react";
import Text from "./../../classes/Text";
import { TextDisplaying } from "./TextDisplaying";
import { isSingleLetterOrDigit } from "./Helper";
import assert from "assert";

export default class Catcher extends Component {
    state = {
        hubConnection: null,
        text: new Text()
    }

    receiveWriterInput = (input) => {
        assert(typeof(input) === "string", "Input must be of type string!");

        let text = this.state.text;
        text.addInput(input);
        text.addInput(" ");
        this.setState({text: text});
    }

    sendKeyPressToWriter = (keyPressed) => {
        assert(typeof(keyPressed) === "string");

        this.state.hubConnection.invoke("CatcherKeyPressSent", localStorage.getItem("groupId"), keyPressed);
        
    }

    compareKeyPressToText = (keyPressed) => {
        let text = this.state.text;

        if(text.currentTextPositionIndex >= text.textElements.length-1){
            return;
        }
        
        if(keyPressed === text.getCurrentElement().char){
            text.setCurrentElementColorGreen();
        }
        else{
            text.setCurrentElementColorRed();
        }

        text.incrementCurrentTextPositionIndex();
        this.setState({text: text});
    }

    handleBackSpace = () => {
        let text = this.state.text;

        if(text.textElements[text.currentTextPositionIndex-1].char === " "){
            return;
        }

        text.handleBackSpace();
        this.sendKeyPressToWriter("BackSpace");

        this.setState({text: text});
    }

    handleOnKeyDown = (event) => {

        if(this.state.text.currentTextPositionIndex >= this.state.text.textElements.length){
            return;
        }

        let keyPressed = event.key;

        if(keyPressed === "Backspace"){
            this.handleBackSpace();
        }
        else if(isSingleLetterOrDigit(keyPressed) || keyPressed === " "){
            this.sendKeyPressToWriter(keyPressed);
            this.compareKeyPressToText(keyPressed);

            if(keyPressed === " "){
                event.preventDefault();
                event.target.value = "";
            }
        }
    }

    render(){
        return (
            <React.Fragment>
                <TextDisplaying text={this.state.text}/>
                <input type="text" onKeyDown={this.handleOnKeyDown}/>
            </React.Fragment>
        );
    }

    componentDidMount = () => {
        let hubConnection = this.props.hubConnection;
        hubConnection.on("receiveWriterInput", this.receiveWriterInput);
        this.setState({hubConnection: hubConnection});
    }

}