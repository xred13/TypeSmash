import assert from "assert";

export default class Text{
    textElements = [];
    currentTextPositionIndex = 0;

    constructor(){
        this.textElements = [];
    }

    incrementCurrentTextPositionIndex = () => {
        this.currentTextPositionIndex++;
    }

    decrementCurrentTextPositionIndex = () => {
        this.currentTextPositionIndex--;
    }

    getCurrentElement = () => {
        return this.textElements[this.currentTextPositionIndex];
    }

    getElementAtIndex = (index) => {
        return this.textElements[index];
    }

    handleKeyPressed = (keyPressed) => {
        if(keyPressed === "Backspace"){
            this.handleBackSpace();
        }
        else{
            this.setCurrentElementColor(keyPressed);
        }
    }

    setCurrentElementColor = (keyPressed) => {
        if(this.currentTextPositionIndex < this.textElements.length){
            if(this.textElements[this.currentTextPositionIndex].char === keyPressed){
                this.textElements[this.currentTextPositionIndex].color = Color.GREEN;
                this.textElements[this.currentTextPositionIndex].backgroundColor = Color.WHITE;
            }
            else{
                this.textElements[this.currentTextPositionIndex].color = Color.NEUTRAL;
                this.textElements[this.currentTextPositionIndex].backgroundColor = Color.RED;
            }
        }

        this.incrementCurrentTextPositionIndex();
    }

    handleBackSpace = () => {
        if(this.currentTextPositionIndex - 1 < 0){
            return;
        }

        this.decrementCurrentTextPositionIndex();
        this.textElements[this.currentTextPositionIndex].color = Color.NEUTRAL;
        this.textElements[this.currentTextPositionIndex].backgroundColor = Color.WHITE;
    }

    addInput = (input) => {
        for(let char of input){
            let newTextElement = new TextElement(char, Color.NEUTRAL);

            this.textElements.push(newTextElement);
        }
    }
}

export class TextElement{
    char = "";
    color = Color.NEUTRAL;
    backgroundColor = Color.WHITE;

    constructor(char){
        this.char = char;
        this.color = Color.NEUTRAL;
    }

    changeColor = (color) => {
        this.color = color;
    }
}

export let Color= {
    NEUTRAL: "black",
    RED: "red",
    GREEN: "green",
    WHITE: "white"
}