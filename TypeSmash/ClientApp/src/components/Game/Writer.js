import React, {Component} from "react";
import Text, { Color } from "./../../classes/Text";
import { TextDisplaying } from "./TextDisplaying";

export default class Writer extends Component {

    state = {
        hubConnection: null,
        text: new Text()
    }

    sendInput = (inputSent) => {
        let groupId = localStorage.getItem("groupId");
        this.state.hubConnection.invoke("WriterInputSent", groupId, inputSent);
    }

    addInputToTextState = (input) => {
        let text = this.state.text;
        text.addInput(input);
        this.setState({text: text});
    }

    handleInputOnKeyDown = (event) => {

        let keyPressed = event.key;

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

        let textElement = text.getCurrentElement();

        if(keyPress === textElement.char){
            text.setCurrentElementColorGreen();
        }
        else{
            text.setCurrentElementColorRed();
        }

        text.incrementCurrentTextPositionIndex();

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