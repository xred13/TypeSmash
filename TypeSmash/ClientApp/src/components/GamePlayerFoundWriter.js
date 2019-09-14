import React, {Component} from "react";
import { stringify } from "querystring";

export default class GamePlayerRoleWriter extends Component{

    state = {
        writtenText : ""
    }

    hasCharactersAfterSpace = (word) => {
        // if there is a space in the word and it isn't the last character, returns true
        for(let i = 0; i < word.length-1; i++){
            if(word[i] === " "){
                return true;
            }
        }

        return false;
    }

    separateInputWords = (word) => {
        let spacePosition = word.search(" ");
        let firstWord = word.slice(0, spacePosition+1), secondWord = word.slice(spacePosition+1, word.length);

        return [firstWord, secondWord]
    }

    keyPressed = (e) => {

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
          }
          else{
            e.target.value = "";
          }

          let charEntered = String.fromCharCode(charEnteredKeyCode.toString());

          sendNewWrittenWord(inputText);
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