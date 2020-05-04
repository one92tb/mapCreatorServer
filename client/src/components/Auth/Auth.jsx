import React from "react";

import Login from "../Login/Login";
import { AppComponent } from "./AppComponent/AppComponent";
import { Router, Switch, Route } from "react-router-dom";

import history from "../../history";

export const Auth = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
      <AppComponent exact />
    </Switch>
  </Router>
);
