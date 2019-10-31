import React, {Component} from "react";
import * as signalR from "@aspnet/signalr";
import Catcher from "./Catcher";
import Writer from "./Writer";
import Cookies from "universal-cookie";

export default class Game extends Component{

    state = {
        hubConnection: null,
        gameReady: false,
        playerRole: ""
    }

    setGroupIdCookieAndPlayerRole = (groupId, playerRole) => {

        console.log(playerRole);

        localStorage.setItem("groupId", groupId);

        this.setState({gameReady: true, playerRole: playerRole});
    }

    initializeHubConnection = () => {
        let hubConnection = new signalR.HubConnectionBuilder().withUrl("gamehub").build();

        hubConnection.on("setGroupIdCookieAndPlayerRole", this.setGroupIdCookieAndPlayerRole);

        this.setState({hubConnection: hubConnection}, () => {
            this.state.hubConnection.start();
        });
    }

    componentDidMount = () => {
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
                <Writer hubConnection={this.state.hubConnection}/>  
                : this.state.playerRole === "Catcher" ?
                <Catcher hubConnection={this.state.hubConnection}/>
                :
                <div> Something has occurred! </div>
            }
        </div>
        );
    }
}