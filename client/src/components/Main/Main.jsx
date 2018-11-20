import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import Panel from "./Panel/Panel";
import Map from "./Map/Map";
import CreateMarker from "./MarkerCreator/MarkerCreator";
import { Switch, Route } from "react-router-dom";

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
    path: "/map",
    exact: true,
    section: Map
  },
  {
    path: "/createMarker",
    section: CreateMarker
  }
];

class Main extends Component {
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
