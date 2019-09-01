import React from 'react';
import { Route } from 'react-router';
import Login from './components/Login';
import Game from "./components/Game";

export default () => (
  <React.Fragment>
    <Route exact path='/' component={Login} />
    <Route exact path="/game" component={Game} />
  </React.Fragment>
);
