import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "react-router";
import {Alert, Button, ButtonToolbar} from "react-bootstrap";

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

  setUsernameValidity = (username) => {
    if(this.isOnlyLettersAndNumbers(username)){
      this.setState({isUsernameValid: true});
    }
    else{
      this.setState({isUsernameValid: false});
    }
  }

  onChangeUpdateStateUsername = (event) => {

    const username = event.target.value;

    this.setUsernameValidity(username);

    this.setState({
      username: username
    });
  }

  setUsernameAvailability = (availability) => {
    this.setState({usernameAvailable: availability});
  }

  checkUsernameAvailability = (username) => {

    axios.post("https://localhost:5001/api/isusernamevalid/" + username)
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

  componentWillUpdate(nextProps, nextState){

    // if the update is caused by a change in the username input field, we ask the server if the new username is available
    if(this.isUsernameValid && nextState.username !== this.state.username){
      this.checkUsernameAvailability(nextState.username);
    }
  }

  submitUsername = (event) => {
    event.preventDefault();
    axios.post("https://localhost:5001/api/submitusername/" + this.state.username)
      .then(response => {
        if(response.status === 200){
          this.props.history.push("/game");
        }
        else if (response.status === 500){
        }
      })
  }

  render(){
    return (
      <div className="login-main-div">
        <div className="login-form-main">
          <div className="login-form">
            <form>
              <input
                type="text"
                id="username"
                onChange={this.onChangeUpdateStateUsername}
                placeholder="Username"
              />
            </form>
            <div className="login-form-warning">
              {this.isUsernameValid === false ? (
                <Alert bsStyle="danger" className="login-form-warning-alert">Invalid Username</Alert>
              ) : this.isUsernameAvailable ? (
                <Alert bsStyle="success" className="login-form-warning-alert" >Username available</Alert>
              ) : (
                <Alert bsStyle="danger" className="login-form-warning-alert">Username unavailable</Alert>
              )}
            </div>
            <ButtonToolbar>
              <Button
                bsStyle="success"
                bsSize="large"
                onClick={this.submitUsername}
              >
                Play!
              </Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UsernameLogin);


