import React, {Component} from "react";
import { isBuffer } from "util";

let color= {
    NEUTRAL: "black",
    RED: "red",
    GREEN: "green"
}

class Letter{
    letter = "";
    color = color.NEUTRAL;

    constructor(letter){
        this.letter = letter;
        this.color = color.NEUTRAL;
    }
}

export default class GamePlayerFoundCatcher extends Component{

    state = {
        receivedTextLetterArray: [],
        currentArrayElement: 0,
        wrongLetterCount: 0
    }

    addWordToState = (word) => {
        console.log("adding word: " + word)

        let newWordLetterArray = word.split("");
        let newArray = []
        for(var char of newWordLetterArray){
            let letter = new Letter(char);
            newArray.push(letter);
        }
        this.setState({receivedTextLetterArray: this.state.receivedTextLetterArray.concat(newArray)});

    }

    onKeyPress = (event) => {

        let charEnteredKeyCode = event.keyCode;
        let charEntered = String.fromCharCode(charEnteredKeyCode);

        if(!event.shiftKey){
            charEntered = charEntered.toLowerCase();
        }

        let spaceCharKeyCode = 32,
            enterKeyCode = 13;

        console.log("char entered:"+charEntered);
        console.log("receivedtextletter:"+this.state.receivedTextLetterArray[this.state.currentArrayElement]);
        if(charEntered === this.state.receivedTextLetterArray[this.state.currentArrayElement].letter){
            let newArray = [...this.state.receivedTextLetterArray];
            newArray[this.state.currentArrayElement].color = color.GREEN;
            this.setState({receivedTextLetterArray: newArray});
        }
        else{
            let newArray = [...this.state.receivedTextLetterArray];
            newArray[this.state.currentArrayElement].color = color.RED;
            this.setState({receivedTextLetterArray: newArray});
        }

        this.setState({currentArrayElement: this.state.currentArrayElement+1});
    }


    render(){

        return(
            <div>
                {this.state.receivedTextLetterArray.map((letter, i) => {
                    return <span style={{color: letter.color}} key={i}>{letter.letter}</span>
                })}
                <br />
                <input type="text" onKeyUp={this.onKeyPress}/>
            </div>
        );
    }
}