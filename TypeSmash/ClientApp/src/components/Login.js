import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "react-router";
import {Alert, Button, ButtonToolbar} from "react-bootstrap";

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

  setUsernameAvailability = (available) => {
    this.setState({usernameAvailable: available});
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
                onChange={this.onChangeUpdateState}
                placeholder="Username"
              />
            </form>
            <div className="login-form-warning">
              {this.state.usernameAvailable ? (
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

export default withRouter(Login);


