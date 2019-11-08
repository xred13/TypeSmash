import React, {Component} from "react";
import Text, { Color } from "./../../classes/Text";
import { TextDisplaying } from "./TextDisplaying";
import { isSingleLetterOrDigitOrAllowed } from "./Helper";

export default class Writer extends Component {

    state = {
        hubConnection: null,
        text: new Text(),
        enterKeyPressed: 0
    }

    sendInput = async (inputSent) => {
        let groupId = sessionStorage.getItem("groupId");
        await this.state.hubConnection.invoke("WriterInputSent", groupId, inputSent);
    }

    addInputToTextState = (input) => {
        let text = this.state.text;
        text.addInput(input);
        this.setState({text: text});
    }

    handleInputOnKeyDown = async (event) => {

        let keyPressed = event.key;

        if(this.props.gameEnded || !isSingleLetterOrDigitOrAllowed(keyPressed)){
            event.preventDefault();
            return;
        }

        if(keyPressed === "Enter"){
            if(this.state.enterKeyPressed === 1){
                this.props.endGame();
                await this.sendInput("End Game");
            }
            else{
                this.setState({enterKeyPressed: this.state.enterKeyPressed + 1});
            }
            return;
        }

        switch(keyPressed){
            case " ":
                event.preventDefault();

                this.addInputToTextState(event.target.value);
                this.addInputToTextState(" ");
                this.sendInput(event.target.value);

                event.target.value = "";
                break;
            default:
                break;
        }
    }

    receiveCatcherKeyPress = (keyPress) => {
        let text = this.state.text;

        console.log(keyPress);

        text.handleKeyPressed(keyPress);

        this.setState({text: text});
    }

    render(){
        return (
            <React.Fragment>
                <TextDisplaying text={this.state.text} />
                <input type="text" onKeyDown={this.handleInputOnKeyDown} />
            </React.Fragment>
        );
    }

    componentDidMount = () => {
        let hubConnection = this.props.hubConnection;
        hubConnection.on("receiveCatcherKeyPress", this.receiveCatcherKeyPress);
        this.setState({hubConnection: hubConnection});
    }
}