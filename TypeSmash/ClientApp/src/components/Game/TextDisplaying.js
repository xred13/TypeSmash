import React, {Component} from "react";

export const TextDisplaying = (props) => {

    let text = props.text;

    return(
        <div>
            {text.elements.map((element, i) => (
                <span style={{color: element.color}} key={i}>
                    {element.char}
                </span>
            ))
            }
        </div>
    );
}