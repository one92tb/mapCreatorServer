import React from "react";

import Login from "../Login/Login";
import { AuthApp } from "./AuthApp/AuthApp";
import { Router, Switch, Route } from "react-router-dom";

import history from "../../history";

export const Auth = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
      <AuthApp exact />
    </Switch>
  </Router>
);
