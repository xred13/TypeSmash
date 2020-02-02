import React, {Component} from "react";
import UsernameLogin from "./UsernameLogin/UsernameLogin";

export default class HomePage extends Component{

  render(){
    return(
      <div className="homepage-main-div">
        <UsernameLogin />
      </div>
    );
  }
}