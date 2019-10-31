export const isSingleLetterOrDigit = (string) => {

    var letterOrNumber = /^[0-9a-zA-Z]+$/

    if(string.match(letterOrNumber) && string.length === 1){
        return true;
    }
    else{
        return false;
    }
}