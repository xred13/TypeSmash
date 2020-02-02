import React, {Component} from "react";
import { HubConnection } from "@aspnet/signalr";
import { withRouter } from "react-router";

class GameMenu extends Component{

    playButtonClicked = () => {
        this.props.history.push("/game");
    }

    render(){
        return(
            <div className="gamemenu-play-button">
                <button onClick={this.playButtonClicked}>Play!</button>
            </div>
        );
    }
}

export default withRouter(GameMenu);