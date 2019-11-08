export const isSingleLetterOrDigitOrAllowed = (string) => {

    var letterOrNumber = /^[0-9a-zA-Z$-/:-?{-~!"^_`\[\]]+$/

    if(string.match(letterOrNumber) && string.length === 1 || string === " " || string === "Enter" || string === "Backspace"){
        return true;
    }
    else{
        console.log("String: " + string + " not allowed!");
        return false;
    }
}