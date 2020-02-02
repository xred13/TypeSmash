import React, {Component} from "react";
import { Icon } from "semantic-ui-react";

export const UsernameValidationIcon = (props) => {

    return (
      <React.Fragment>
        {props.isUsernameValid === false || props.isUsernameAvailable === false ? (
          <Icon className="login-form-username-validation-icon" name="x" color="red" size="large" />
        ) : (
          <Icon className="login-form-username-validation-icon" name="checkmark" color="green" size="large" />
        )}
      </React.Fragment>
    );
}