import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "react-router";
import { Icon } from "semantic-ui-react";
import typingImage from "./../../../images/typingduel.png";
import {UsernameValidationIcon} from "./UsernameValidationIcon";
import {PlayButton} from "./PlayButton";
import {InvalidUsernameMessage} from "./InvalidUsernameMessage";

class UsernameLogin extends Component{

  state = {
    username: "",
    isUsernameValid: false,
    isUsernameAvailable: false
  }

  isUsernameValid = () => {
    return this.state.isUsernameValid;
  }

  isUsernameAvailable = () => {
    return this.state.isUsernameAvailable;
  }

  isOnlyLettersAndNumbers = (str) => {
    return str.match("^[A-z0-9]+$");
  }

  setUsernameValidity = () => {

    let username = this.state.username;

    if(this.isOnlyLettersAndNumbers(username)){
      this.setState({isUsernameValid: true
      }, () => this.checkUsernameAvailability());
    }
    else{
      this.setState({isUsernameValid: false});
    }
  }

  onKeyDown = (event) => {
    let keyPressed = event.key;

    if(keyPressed === "Enter"){
      event.preventDefault();
      this.submitUsername(event);
    }
  }

  onChangeUpdateStateUsername = (event) => {

    const username = event.target.value;

    this.setState({
      username: username
    }, () => this.setUsernameValidity());

  }

  setUsernameAvailability = (availability) => {
    this.setState({isUsernameAvailable: availability});
  }

  checkUsernameAvailability = () => {

    let username = this.state.username;

    axios.post("https://localhost:5001/homepage/isusernameavailable/" + username)
      .then((response) => {
        if(response.data){
          this.setUsernameAvailability(true);
        }
        else{
          this.setUsernameAvailability(false);
        }
      })
      .catch(response => {
        this.setUsernameAvailability(false);
      })
  }

  submitUsername = (event) => {
    event.preventDefault();
    axios.post("https://localhost:5001/homepage/submitusername/" + this.state.username)
      .then(response => {
        if(response.status === 200){
          sessionStorage.setItem("username", this.state.username);
          this.props.history.push("/gamemenu");
        }
        else if (response.status === 500){
        }
      })
  }

  render(){
    return (
      <div className="login-form-main">
        <div className="login-form">
          <InvalidUsernameMessage username={this.state.username} isUsernameValid={this.state.isUsernameValid}/>
          <form>
            <input
              type="text"
              id="username"
              onKeyDown={(event) => this.onKeyDown(event)}
              onChange={(event) => this.onChangeUpdateStateUsername(event)}
              placeholder="Username"
            />
          </form>
          <UsernameValidationIcon isUsernameValid={this.state.isUsernameValid} isUsernameAvailable={this.state.isUsernameAvailable} />
          <PlayButton className="login-form-play-button" submitUsername={(event) => this.submitUsername(event)} />
        </div>
      </div>
    );
  }
}

export default withRouter(UsernameLogin);


