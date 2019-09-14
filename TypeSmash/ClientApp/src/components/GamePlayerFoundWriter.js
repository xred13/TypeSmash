import React, {Component} from "react";
import { stringify } from "querystring";

export default class GamePlayerRoleWriter extends Component{

    state = {
        writtenText : ""
    }

    hasCharactersAfterSpace = (word) => {
        // if there is a space in the word and it isn't the last character, returns true
        console.log("does it have space?: " + word);
        for(let i = 0; i < word.length-1; i++){
            if(word[i] === " "){
                console.log("has space");
                return true;
            }
        }

        console.log("doesn't have space");
        return false;
    }

    separateInputWords = (word) => {
        let spacePosition = word.search(" ");
        console.log("Space position: " + spacePosition);
        console.log("word: " + word);
        let firstWord = word.slice(0, spacePosition+1), secondWord = word.slice(spacePosition+1, word.length);
        console.log(firstWord + ";" + secondWord);

        return [firstWord, secondWord]
    }

    keyPressed = (e) => {

        console.log("key pressed: " + String.fromCharCode(e.keyCode));

        let charEnteredKeyCode = e.keyCode;

        let spaceCharKeyCode = 32,
            enterKeyCode = 13;

        if (charEnteredKeyCode === spaceCharKeyCode) {
          let props = this.props;
          let sendNewWrittenWord = props.sendNewWrittenWord;

          let inputText = e.target.value;

          // a fix to the fact we can write fast and add letters to the input field while keyPressed is being called
          if(this.hasCharactersAfterSpace(inputText)){
            [inputText, e.target.value] = this.separateInputWords(inputText);
            console.log("split words: " + inputText + ";" + e.target.value);
          }
          else{
            e.target.value = "";
          }

          let charEntered = String.fromCharCode(charEnteredKeyCode.toString());

          sendNewWrittenWord(inputText);
          console.log("setting state to: " + inputText + ";");
          this.setState({ writtenText: this.state.writtenText + inputText });
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