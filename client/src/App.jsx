import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import MarkerCreator from "./components/MarkerCreator/MarkerCreator";
import Map from "./components/Map/Map";
import Panel from "./components/Panel/Panel";
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
    section: Map
  },
  {
    path: "/createMarker",
    section: MarkerCreator
  },
  {
    path: "/selectMarker",
    section: Map
  },
  {
    path: "/filterMarker",
    section: Map
  }
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
            <Col tag={ColStyle} lg="10">
              <Row tag={RowStyle}>
                <Col tag={ColStyle} lg="3">
                  <Panel />
                </Col>
                <Col tag={ColStyle} lg="9">
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
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;
