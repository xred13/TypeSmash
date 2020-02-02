import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";

export const PlayButton = (props) => {
    return(
        <ButtonToolbar>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={props.submitUsername}
            >
              Play!
            </Button>
          </ButtonToolbar>
    );
}