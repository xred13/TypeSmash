import React, {Component} from "react";
import {playerRoles} from "./Game";
import GamePlayerFoundCatcher from "./GamePlayerFoundCatcher";
import GamePlayerFoundWriter from "./GamePlayerFoundWriter";

export default class GamePlayerFound extends Component{


    render(){
        let props = this.props;
        let playerRole = props.playerRole;
        let sendNewWrittenWord = props.sendNewWrittenWord;
        let sendWriterNewKeyPressKeyCode = props.sendWriterNewKeyPressKeyCode;
        let sendWriterNewKeyPressKeyCodeRef = props.sendWriterNewKeyPressKeyCodeRef;
        let catcherNewWordReceivedRef = props.catcherNewWordReceivedRef;

        return(
            <div>
                {playerRole === playerRoles.WRITER ? 
                    <GamePlayerFoundWriter sendNewWrittenWord={sendNewWrittenWord} ref={sendWriterNewKeyPressKeyCodeRef}/>
                    
                : playerRole === playerRoles.CATCHER ?
                    <GamePlayerFoundCatcher sendWriterNewKeyPressKeyCode={sendWriterNewKeyPressKeyCode} ref={catcherNewWordReceivedRef} />
                :
                    null
                }
            </div>
            
        );
    }
}