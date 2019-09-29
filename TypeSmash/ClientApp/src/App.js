import React from 'react';
import { Route } from 'react-router';
import Login from './components/Login';
import Game from "./components/Game";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/sass/app.css";

export default () => (
  <div id="main-container">
    <Route exact path='/' component={Login} />
    <Route exact path="/game" component={Game} />
  </div>
);
