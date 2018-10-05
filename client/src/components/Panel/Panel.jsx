import React, { Component } from "react";
import { Card, CardHeader, CardBody, Nav, NavItem, NavLink } from "reactstrap";
import "./panel.css";
import MarkerList from "./MarkerList/MarkerList";
import MarkerFilter from "./MarkerFilter/MarkerFilter";
import { Link, Route, Switch } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <MarkerList />
  },
  {
    path: "/createMarker",
    sidebar: () => <MarkerList />
  },
  {
    path: "/selectMarker",
    sidebar: () => <MarkerList />
  },
  {
    path: "/filterMarker",
    sidebar: () => <MarkerFilter />
  }
];

class Panel extends Component {
  render() {
    return (
      <Card className="panelCard">
        <CardHeader>
          <Nav>
            <NavItem>
              <NavLink tag={Link} to="/selectMarker">
                Select Marker
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/filterMarker">
                Filter Marker
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody className="scroll">
          <Switch>
            {routes.map((route, id) => (
              <Route
                key={id}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </Switch>
        </CardBody>
      </Card>
    );
  }
}

export default Panel;
