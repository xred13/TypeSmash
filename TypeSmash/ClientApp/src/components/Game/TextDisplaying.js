import React, {Component} from "react";

export const TextDisplaying = (props) => {

    let text = props.text;

    return(
        <div>
            {text.textElements.map((element, i) => (
                <span style={{color: element.color, backgroundColor: element.backgroundColor}} key={i}>
                    {element.char}
                </span>
            ))
            }
        </div>
    );
}