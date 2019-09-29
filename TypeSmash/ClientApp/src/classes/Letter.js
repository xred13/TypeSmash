export class Letter{
    letter = "";
    color = color.NEUTRAL;

    constructor(letter){
        this.letter = letter;
        this.color = color.NEUTRAL;
    }
}

export let color= {
    NEUTRAL: "black",
    RED: "red",
    GREEN: "green"
}