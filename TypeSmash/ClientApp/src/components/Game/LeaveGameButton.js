import React, { Component } from "react";
import { withRouter } from "react-router";

class LeaveGameButton extends Component{

    leaveButtonClicked = () => {
        this.props.history.push("/gamemenu");
    }

    render(){
        return(
            <button onClick={this.leaveButtonClicked}>
                Leave
            </button>
        );
    }
}

export default withRouter(LeaveGameButton);