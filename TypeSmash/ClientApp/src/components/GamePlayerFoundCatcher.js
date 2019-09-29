import React, {Component} from "react";
import {Letter, color} from "./../classes/Letter";

export default class GamePlayerFoundCatcher extends Component{

    state = {
        receivedTextLetterArray: [],
        currentArrayElement: 0
    }

    stateIncrementCurrentArrayElement = () => {
        this.setState({currentArrayElement: this.state.currentArrayElement+1});
    }

    stateDecrementCurrentArrayElement = () => {
        this.setState({currentArrayElement: this.state.currentArrayElement-1});
    }

    addWordToState = (word) => {

        let newWordLetterArray = word.split("");
        let newArray = []
        for(var char of newWordLetterArray){
            let letter = new Letter(char);
            newArray.push(letter);
        }
        this.setState({receivedTextLetterArray: this.state.receivedTextLetterArray.concat(newArray)});

    }
    

    changeArrayElementColor = (index, color) => {
        let newArray = [...this.state.receivedTextLetterArray];
        newArray[index].color = color;
        this.setState({receivedTextLetterArray: newArray});
    }

    backSpaceClicked = () => {
        if(this.state.receivedTextLetterArray[this.state.currentArrayElement-1].letter !==  " "){
            this.changeArrayElementColor(this.state.currentArrayElement-1, color.NEUTRAL);
            this.stateDecrementCurrentArrayElement();
        }    
    }

    changeCurrentArrayElementColor = (charEntered) => {

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

        this.stateIncrementCurrentArrayElement();
    }

    onKeyPress = (event) => {

        let spaceKeyCode = 32,  backSpaceKeyCode = 8;

        let charEnteredKeyCode = event.keyCode;
        let charEntered = String.fromCharCode(charEnteredKeyCode);

        this.props.sendWriterNewKeyPressKeyCode(charEnteredKeyCode);

        if(!event.shiftKey){
            charEntered = charEntered.toLowerCase();
        }

        if(charEnteredKeyCode === spaceKeyCode){
            if(this.state.receivedTextLetterArray[this.state.currentArrayElement].letter === " "){
                event.target.value = "";
                this.stateIncrementCurrentArrayElement();
            }
            else{
                event.target.value = event.target.value.substring(0, event.target.value.length - 1);
            }
        }
        else if(charEnteredKeyCode === backSpaceKeyCode){
            this.backSpaceClicked();
        }
        else{
            if(this.state.receivedTextLetterArray[this.state.currentArrayElement].letter !== " "){
                this.changeCurrentArrayElementColor(charEntered);
            }
        }
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