import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import Panel from "./Panel/Panel";
import Map from "./Map/Map";
import CreateMarker from "./MarkerCreator/MarkerCreator";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ContainerStyle = styled.div`
  height: 100%;
  padding: 0 !important;
  margin: 0!important;
  width: 100%;
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
    section: CreateMarker
  }
];

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
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
    );
  }
}

export default Main;
