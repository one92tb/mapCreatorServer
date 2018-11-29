import React from "react";
import NavBar from "../NavBar/NavBar";
import Main from "../Main/Main";
import Statistic from "../Statistic/Statistic";
import List from "../List/List";
import { Container, Row, Col } from "reactstrap";
import { ContainerStyle, RowStyle, ColStyle } from "./style";
import Login from "../Login/Login";
import history from "../../history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const routes = [
  {
    path: "/",
    exact: true,
    section: Main
  },
  {
    path: "/createMarker",
    section: Main
  },
  {
    path: "/statistic",
    section: Statistic
  },
  {
    path: "/list",
    section: List
  }
];

const checkAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  } else {
    console.log(token);
  }

  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

const AuthRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? <AppContent /> : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
};

const AppContent = () => {
  console.log(this.props);
  return (
    <Container fluid tag={ContainerStyle}>
      <Row tag={RowStyle}>
        <Col tag={ColStyle} lg="2">
          <NavBar />
        </Col>
        <Col tag={ColStyle} lg="10">
          <Switch>
            {routes.map((route, id) => (
              <Route
                key={id}
                path={route.path}
                exact={route.exact}
                component={route.section}
              />
            ))}
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

const Auth = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
      <AuthRoute exact />
    </Switch>
  </Router>
);

export default Auth;
