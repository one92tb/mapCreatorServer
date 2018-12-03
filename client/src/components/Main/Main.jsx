import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { RowStyle, ColStyle } from "./style";
import Panel from "./Panel/Panel";
import Map from "./Map/Map";
import MarkerCreator from "./MarkerCreator/MarkerCreator";
import { Switch, Route } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    section: Map
  },
  {
    path: "/createMarker",
    section: MarkerCreator
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
