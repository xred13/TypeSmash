import React from "react";
import {Alert, Button, ButtonToolbar, InputGroup, FormControl} from "react-bootstrap";

export const InvalidUsernameMessage = (props) => {
    return(
        <React.Fragment>
            {props.username === "" ?
                null
                :
                props.isUsernameValid === false ?
                <Alert className="login-form-invalid-username-message" bsStyle="danger" bsSize="xs">
                    Only letters and numbers!
                </Alert>
                : 
                null
            }
        </React.Fragment>
    );
}