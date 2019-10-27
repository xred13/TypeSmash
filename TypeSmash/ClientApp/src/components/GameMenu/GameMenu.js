import React, {Component} from "react";
import { HubConnection } from "@aspnet/signalr";

class GameMenu extends Component{

    state = {
        hubConnection: null
    }

    playButtonClicked = () => {

    }

    render(){
        return(
            <div>
                <button onClick={this.playButtonClicked}>Play!</button>
            </div>
        );
    }
}

export default GameMenu;