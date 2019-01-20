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
    console.log(this.props);
    const { location } = this.props;
    return (
      <Row tag={RowStyle}>
        <Col currentLocation={location} tag={ColStyle} lg="3" md="12">
          <Panel {...this.props} />
        </Col>
        <Col currentLocation={location} tag={ColStyle} lg="9" md="12">
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
