import React, {Component} from "react";
import * as signalR from "@aspnet/signalr";
import Catcher from "./Catcher";
import Writer from "./Writer";

export default class Game extends Component{

    state = {
        hubConnection: null,
        gameReady: false,
        playerRole: ""
    }

    playerRole = (playerRole) => {
        this.setState({gameReady: true, playerRole: playerRole});
    }

    initializeHubConnection = () => {
        let hubConnection = new signalR.HubConnectionBuilder().withUrl("gamehub").build();

        hubConnection.on("PlayerRole", this.playerRole);

        this.setState({hubConnection: hubConnection}, () => {
            this.state.hubConnection.start();
        });
    }

    componentWillMount = () => {
        this.initializeHubConnection();
    }

    render(){
        return(
        <div>
            {
                this.state.gameReady === false ?
                <div> LFP </div>
                :
                this.state.playerRole === "Writer" ? 
                <Writer />  
                : this.state.playerRole === "Catcher" ?
                <Catcher />
                :
                <div> Something has occurred! </div>
            }
        </div>
        );
    }
}