import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import Statistic from "./components/Statistic/Statistic";
import List from "./components/List/List";

import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ContainerStyle = styled.div`
  height: 100%;
  padding: 0 !important;
`;

const RowStyle = styled.div`
  height: 100%;
  margin: 0 !important;
`;
const ColStyle = styled.div`
  padding: 0!important
  height: 100%;
`;

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
  },
];

class App extends Component {
  render() {
    return (
      <Router className="mainComponent">
        <Container fluid tag={ContainerStyle}>
          <Row tag={RowStyle}>
            <Col tag={ColStyle} lg="2">
              <NavBar />
            </Col>
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
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;
