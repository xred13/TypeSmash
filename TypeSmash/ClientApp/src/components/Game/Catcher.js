import React, {Component} from "react";
import Text from "./../../classes/Text";
import { TextDisplaying } from "./TextDisplaying";
import { isSingleLetterOrDigitOrAllowed } from "./Helper";
import assert from "assert";
import { Color } from "./../../classes/Text";

export default class Catcher extends Component {
    state = {
        hubConnection: null,
        text: new Text(),
        catcherTextIndex: 0,
        writerGameEnded: false
    }

    canSubmit = () => {
        let text = this.state.text;

        for(let i = this.state.catcherTextIndex; i < text.textElements.length; i++){
            if(text.textElements[i].backgroundColor === Color.RED){
                return false;
            }
            if(text.textElements[i].color === Color.NEUTRAL){
                return true;
            }
        }

        this.setState({catcherTextIndex: this.state.catcherTextIndex + 1});

        return true;
    }

    receiveWriterInput = (input) => {
        assert(typeof(input) === "string", "Input must be of type string!");

        if(input === "End Game"){
            this.setState({writerGameEnded: true});
            if(this.canSubmit() && this.state.text.currentTextPositionIndex === this.state.text.textElements.length){
                this.props.endGame();
            }
            return;
        }

        let text = this.state.text;
        text.addInput(input);
        text.addInput(" ");
        this.setState({text: text});
    }

    sendKeyPressToWriter = (keyPressed) => {
        assert(typeof(keyPressed) === "string");

        this.state.hubConnection.invoke("CatcherKeyPressSent", sessionStorage.getItem("groupId"), keyPressed);
    }

    compareKeyPressToText = (keyPressed) => {
        let text = this.state.text;

        if(text.currentTextPositionIndex >= text.textElements.length-1){
            return;
        }
        
        text.setCurrentElementColor(keyPressed);

        this.setState({text: text});
    }

    handleOnKeyDown = (event) => {
        let keyPressed = event.key;

        let text = this.state.text;

        if(this.props.gameEnded || !isSingleLetterOrDigitOrAllowed(keyPressed) || keyPressed === "Backspace" && event.target.value === "" || text.currentTextPositionIndex >= text.textElements.length && keyPressed !== "Backspace"){
            event.preventDefault();
            return;
        }

        if(keyPressed === " "){
            if(text.currentTextPositionIndex < text.textElements.length && text.textElements[text.currentTextPositionIndex].char === " " && this.canSubmit()){
                event.preventDefault();
                event.target.value = "";
            }
        }

        text.handleKeyPressed(keyPressed);
        this.sendKeyPressToWriter(keyPressed);

        if(this.canSubmit() && this.state.writerGameEnded && text.currentTextPositionIndex === text.textElements.length){
            this.props.endGame();
        }

        this.setState({text: text});
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