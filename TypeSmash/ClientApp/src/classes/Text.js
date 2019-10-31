export default class Text{
    elements = []

    constructor(){
        this.elements = [];
    }

    addElement = (element) => {
        this.elements.push(element);
    }
}

export class TextElement{
    char = "";
    color = color.NEUTRAL;

    constructor(char){
        this.char = char;
        this.color = color.NEUTRAL;
    }
}

export let color= {
    NEUTRAL: "black",
    RED: "red",
    GREEN: "green"
}