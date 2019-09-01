import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "react-router";

class Login extends Component{

  state = {
    username: "",
    usernameAvailable: false
  }

  onChangeUpdateState = (event) => {

    const inputId = event.target.id;
    const inputValue = event.target.value;

    this.setState({
      [inputId]: inputValue
    });
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.username !== this.state.username){
      this.checkUsernameAvailability(nextState.username);
    }
  }

  checkUsernameAvailability = (username) => {

    axios.post("https://localhost:5001/api/isusernamevalid/" + username)
      .then((response) => {
        console.log("RESPONSE DATA: " + response.data);
        if(response.data){
          this.setUsernameAvailability(true);
        }
        else{
          this.setUsernameAvailability(false);
        }
      })
      .catch(response => {
        console.log("Unable to connect with the server");
        this.setUsernameAvailability(false);
      })
  }

  setUsernameAvailability = (available) => {
    this.setState({usernameAvailable: available});
    console.log("Setting username availability to " + available);
  }

  submitUsername = (event) => {
    event.preventDefault();
    axios.post("https://localhost:5001/api/submitusername/" + this.state.username)
      .then(response => {
        if(response.status === 200){
          console.log("username submited");
          this.props.history.push("/game");
        }
        else if (response.status === 500){
          console.log("failed to submit");
        }
      })
  }

  render(){
    return(
      <div className="login-form">
        <form>
          <label>
            Username:
            <input type="text" id="username" onChange={this.onChangeUpdateState}/>
          </label>
          
          <input type="submit" value="Play!" onClick={this.submitUsername}/>
        </form>
        {this.state.usernameAvailable ? 
        <div>
          Username available
        </div>
        :
        <div>
          Username unavailable
        </div>
        }
      </div>
    );
  }
}

export default withRouter(Login);


