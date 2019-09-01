import React, {Component} from "react";
import { HubConnection } from "@aspnet/signalr";

class GameMenu extends Component{

    render(){
        let props = this.props;
        let onStartClicked = props.onStartClicked;
        return(
            <div>
                <button onClick={onStartClicked}>
                    Start
                </button>
            </div>
        );
    }
}

export default GameMenu;