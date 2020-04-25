import React from "react";
import { Row, Col } from "reactstrap";
import { RowStyle, ColStyle } from "./style";
import { PanelComponent, Panel } from "./Panel/Panel";
import Map from "./Map/Map";
import MarkerCreator from "./MarkerCreator/MarkerCreator";
import { Switch, Route } from "react-router-dom";

Row.displayName = "div";
Col.displayName = "div";

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

export const Main = ({ ...props }) => (
  <Row tag={RowStyle}>
    <Col currentLocation={props.location} tag={ColStyle} lg="3" md="12">
      <PanelComponent {...props} />
    </Col>
    <Col currentLocation={props.location} tag={ColStyle} lg="9" md="12">
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

export default Main;
