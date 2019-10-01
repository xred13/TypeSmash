import React from 'react';
import { Route } from 'react-router';
import HomePage from './components/HomePage/HomePage.js';
import Game from "./components/Game.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/sass/app.css";

export default () => (
  <div id="main-container">
    <Route exact path='/' component={HomePage} />
    <Route exact path="/game" component={Game} />
  </div>
);
