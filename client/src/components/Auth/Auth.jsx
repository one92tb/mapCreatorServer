import React from "react";
import NavBar from "../NavBar/NavBar";
import Main from "../Main/Main";
import Statistic from "../Statistic/Statistic";
import List from "../List/List";
import Login from "../Login/Login";
import NoAuthorization from "../NoAuthorization/NoAuthorization";
import Users from "../Users/Users";

import { Container, Row, Col } from "reactstrap";
import { ContainerStyle, RowStyle, ColStyle } from "./style";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import history from "../../history";
import decode from "jwt-decode";

export const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

export const AuthAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const { userData } = decode(token);
    if (userData.isAdmin === false) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export const AuthApp = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <AppContent />
        ) : (
          <Redirect from="/" exact to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export const AppContent = () => {
  return (
    <Container fluid tag={ContainerStyle}>
      <Row tag={RowStyle}>
        <Col tag={ColStyle} lg="12" xl="2">
          <NavBar />
        </Col>
        <Col tag={ColStyle} lg="12" xl="10">
          <Switch>
            <Route path={"/"} exact={true} component={Main} />
            <Route path={"/createMarker"} component={Main} />
            <Route path={"/statistic"} component={Statistic} />
            <Route path={"/list"} component={List} />
            <Route
              render={props => (AuthAdmin() ? <Users /> : <NoAuthorization />)}
            />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export const Auth = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
      <AuthApp exact />
    </Switch>
  </Router>
);
