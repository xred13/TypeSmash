import React, {Component} from "react";
import {withRouter} from "react-router";
import * as signalR from "@aspnet/signalr";
import GameMenu from "./GameMenu";
import GamePlayerFound from "./GamePlayerFound";


let playerRoles = {
    NONE : "none",
    WRITER: "writer",
    CATCHER: "catcher",
    getRole: function(role){
        let playerRolesKeys = Object.keys(this);
        for(var playerRoleKey of playerRolesKeys){
            if(playerRoleKey === role){
                return this[playerRoleKey];
            }
        }
    }
}

let gameState = {
    STARTMENU: "startmenu",
    LOOKINGFORPLAYERS: "lookingforplayers",
    PLAYERFOUND: "playerfound"
}

export {playerRoles, gameState};

class Game extends Component{

    constructor(props){
        super(props);
        this.catcherNewWordReceivedRef = React.createRef();
        this.sendWriterNewKeyPressKeyCodeRef = React.createRef();
    }

    state = {
        hubConnection: null,
        groupId: null,
        gameState: gameState.STARTMENU,
        playerRole: playerRoles.NONE
    }

    addGroupIdToState = (groupId) => {
        this.setState({groupId: groupId});
    }

    playerFound = (groupId) => {
        console.log("beginning players found");

        this.addGroupIdToState(groupId);

        this.setState({lookingForPlayers: false, gameState: gameState.PLAYERFOUND});
        console.log("Players Found!");
    }


    playerRole = (role) => {
        this.setState({playerRole: playerRoles.getRole(role)}, () => {
            console.log("role set to: " + role)
        });
    }

    sendNewWrittenWord = (word) => {
        this.state.hubConnection
        .invoke("SendNewWordToCatcher", word, this.state.groupId)
        .catch(error => console.error(error));
    }

    receiveNewWrittenWord = (word) => {
        this.catcherNewWordReceivedRef.current.addWordToState(word);
    }

    sendWriterNewKeyPressKeyCode = (keyCode) => {
        this.state.hubConnection
        .invoke("ReceiveAndSendNewKeyPressKeyCodeToWriter", keyCode, this.state.groupId)
        .catch(error => console.error(error));
    }

    receiveCatchersNewKeyPressKeyCode = (keyCode) => {
        this.sendWriterNewKeyPressKeyCodeRef.current.addCatcherKeyPressToState(keyCode);
    }

    lookingForPlayers = () => {
        console.log("looking for players!");
        this.setState({gameState: gameState.LOOKINGFORPLAYERS});
    }

    onStartClicked = () => {
        
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("gaminghub")
            .build();

        hubConnection.on("playerFound", this.playerFound);

        this.setState({hubConnection: hubConnection}, () => {

            this.state.hubConnection.on("playerFound", this.playerFound);
            this.state.hubConnection.on("playerRole", this.playerRole);
            this.state.hubConnection.on("receiveNewWrittenWord", this.receiveNewWrittenWord);
            this.state.hubConnection.on("receiveCatchersNewKeyPressKeyCode", this.receiveCatchersNewKeyPressKeyCode);

            this.state.hubConnection.start().then(() => {
                console.log("Connected to the hub!");
                this.lookingForPlayers();
            });

        });
    }

    render(){
        return (
          <div>
            {this.state.gameState === gameState.STARTMENU ? (
              <GameMenu onStartClicked={this.onStartClicked} />
            ) : this.state.gameState === gameState.PLAYERFOUND ? (
              <GamePlayerFound
                catcherNewWordReceivedRef={this.catcherNewWordReceivedRef}
                sendWriterNewKeyPressKeyCodeRef={this.sendWriterNewKeyPressKeyCodeRef}
                sendNewWrittenWord={this.sendNewWrittenWord}
                sendWriterNewKeyPressKeyCode={this.sendWriterNewKeyPressKeyCode}
                playerRole={this.state.playerRole}
              />
            ) : (
              <div></div>
            )}
          </div>
        );
    }
}

export default withRouter(Game);