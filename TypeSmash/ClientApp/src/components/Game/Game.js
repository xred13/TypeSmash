import React, {Component} from "react";
import * as signalR from "@aspnet/signalr";
import Catcher from "./Catcher";
import Writer from "./Writer";
import LeaveGameButton from "./LeaveGameButton";

export default class Game extends Component{

    state = {
        hubConnection: null,
        gameReady: false,
        playerRole: "",
        gameEnded: false
    }

    endGame = () => {
        this.setState({gameEnded: true});
    }

    setGroupIdCookieAndPlayerRole = (groupId, playerRole) => {

        console.log(playerRole);

        sessionStorage.setItem("groupId", groupId);

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
                <Writer hubConnection={this.state.hubConnection} gameEnded={this.state.gameEnded} endGame={this.endGame}/>  
                : this.state.playerRole === "Catcher" ?
                <Catcher hubConnection={this.state.hubConnection} gameEnded={this.state.gameEnded} endGame={this.endGame}/>
                :
                <div> Something has occurred! </div>
            }
            {
                this.state.gameEnded ?
                    <LeaveGameButton/>
                :
                    null
            }
        </div>
        );
    }
}