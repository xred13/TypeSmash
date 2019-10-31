import React, {Component} from "react";
import Text from "./../../classes/Text";
import { TextDisplaying } from "./TextDisplaying";

export default class Catcher extends Component {
    state = {
        text: new Text()
    }

    render(){
        return (
            <TextDisplaying text={this.state.text}/>
        );
    }
}