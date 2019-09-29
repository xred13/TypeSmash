import React, { Component } from "react";
import { Letter, color } from "./../classes/Letter";

export default class GamePlayerRoleWriter extends Component {
  state = {
    receivedTextLetterArray: [],
    currentArrayElement: 0
  };

  stateIncrementCurrentArrayElement = () => {
    this.setState({ currentArrayElement: this.state.currentArrayElement + 1 });
  };

  stateDecrementCurrentArrayElement = () => {
    this.setState({ currentArrayElement: this.state.currentArrayElement - 1 });
  };

  addWordToState = word => {
    let newWordLetterArray = word.split("");
    let newArray = [];
    for (var char of newWordLetterArray) {
      let letter = new Letter(char);
      newArray.push(letter);
    }
    this.setState({
      receivedTextLetterArray: this.state.receivedTextLetterArray.concat(
        newArray
      )
    });
  };

  changeArrayElementColor = (index, color) => {
    let newArray = [...this.state.receivedTextLetterArray];
    newArray[index].color = color;
    this.setState({ receivedTextLetterArray: newArray });
  };

  backSpaceClicked = () => {
    if (
      this.state.receivedTextLetterArray[this.state.currentArrayElement - 1]
        .letter !== " "
    ) {
      this.changeArrayElementColor(
        this.state.currentArrayElement - 1,
        color.NEUTRAL
      );
      this.stateDecrementCurrentArrayElement();
    }
  };

  changeCurrentArrayElementColor = charEntered => {
    if (
      charEntered ===
      this.state.receivedTextLetterArray[this.state.currentArrayElement].letter
    ) {
      let newArray = [...this.state.receivedTextLetterArray];
      newArray[this.state.currentArrayElement].color = color.GREEN;
      this.setState({ receivedTextLetterArray: newArray });
    } else {
      let newArray = [...this.state.receivedTextLetterArray];
      newArray[this.state.currentArrayElement].color = color.RED;
      this.setState({ receivedTextLetterArray: newArray });
    }

    this.stateIncrementCurrentArrayElement();
  };

  addCatcherKeyPressToState = (keyCode) => {
    keyCode = parseInt(keyCode);
    let spaceKeyCode = 32,  backSpaceKeyCode = 8;

    if(keyCode === spaceKeyCode && this.state.receivedTextLetterArray[this.state.currentArrayElement].letter === " "){
      console.log("space");
      this.stateIncrementCurrentArrayElement();
    }
    else if(keyCode === backSpaceKeyCode){
      console.log("backspace");
      this.backSpaceClicked();
    }
    else{
      if(this.state.receivedTextLetterArray[this.state.currentArrayElement].letter !== " "){
        this.changeCurrentArrayElementColor(String.fromCharCode(keyCode).toLowerCase());
      }
    }
  };

  hasCharactersAfterSpace = word => {
    // if there is a space in the word and it isn't the last character, returns true
    for (let i = 0; i < word.length - 1; i++) {
      if (word[i] === " ") {
        return true;
      }
    }
    return false;
  };

  separateInputWords = word => {
    let spacePosition = word.search(" ");
    let firstWord = word.slice(0, spacePosition + 1),
      secondWord = word.slice(spacePosition + 1, word.length);

    return [firstWord, secondWord];
  };

  keyPressed = event => {
    let charEnteredKeyCode = event.keyCode;

    let spaceCharKeyCode = 32,
      enterKeyCode = 13;

    if (charEnteredKeyCode === spaceCharKeyCode) {
      let sendNewWrittenWord = this.props.sendNewWrittenWord;

      let inputText = event.target.value;

      console.log(inputText);

      if (inputText === " ") {
        event.target.value = "";
      } else {
        // a fix to the fact we can write fast and add letters to the input field while keyPressed is being called
        if (this.hasCharactersAfterSpace(inputText)) {
          [inputText, event.target.value] = this.separateInputWords(inputText);
        } else {
          event.target.value = "";
        }

        sendNewWrittenWord(inputText);
        this.addWordToState(inputText);
      }
    }
  };

  render() {
    return (
      <div>
        {this.state.receivedTextLetterArray.map((letter, i) => {
          return <span style={{color: letter.color}} key={i}>{letter.letter}</span>
        })}
        <input type="text" onKeyUp={this.keyPressed} />
      </div>
    );
  }
}
