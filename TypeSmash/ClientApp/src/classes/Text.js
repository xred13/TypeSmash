import assert from "assert";

export default class Text{
    textElements = [];
    currentTextPositionIndex = 0;

    constructor(){
        this.textElements = [];
    }

    incrementCurrentTextPositionIndex = () => {
        assert(this.currentTextPositionIndex < this.textElements.length-1);

        this.currentTextPositionIndex++;
    }

    decrementCurrentTextPositionIndex = () => {
        assert(this.currentTextPositionIndex > 0);

        this.currentTextPositionIndex--;
    }

    getCurrentElement = () => {
        return this.textElements[this.currentTextPositionIndex];
    }

    getElementAtIndex = (index) => {
        return this.textElements[index];
    }

    setCurrentElementColorRed = () => {
        this.textElements[this.currentTextPositionIndex].color = Color.RED;
    }

    setCurrentElementColorGreen = () => {
        this.textElements[this.currentTextPositionIndex].color = Color.GREEN;
    }

    setCurrentElementColorNeutral = () => {
        this.textElements[this.currentTextPositionIndex].color = Color.NEUTRAL;
    }

    setElementColorAtIndexGreen = (index) => {
        this.textElements[index].color = Color.GREEN;
    }

    setElementColorAtIndexRed = (index) => {
        this.textElements[index].color = Color.RED;
    }

    setElementColorAtIndexNeutral = (index) => {
        this.textElements[index].color = Color.NEUTRAL;
    }

    addInput = (input) => {
        for(let char of input){
            let newTextElement = new TextElement(char, Color.NEUTRAL);

            this.textElements.push(newTextElement);
        }
    }

    handleBackSpace = () => {
        assert(this.textElements[this.currentTextPositionIndex-1] !== " ");

        this.textElements[this.currentTextPositionIndex-1].color = Color.NEUTRAL;
        this.decrementCurrentTextPositionIndex();
    }
}

export class TextElement{
    char = "";
    color = Color.NEUTRAL;

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
    GREEN: "green"
}