import React from "react";
import {RowStyle, ColStyle} from "./style";
import {PanelComponent} from "./Panel/Panel";
import {MapComponent} from "./Map/Map";
import {MarkerCreatorComponent} from "./MarkerCreator/MarkerCreator";
import {Switch, Route} from "react-router-dom";

RowStyle.displayName = "div";
ColStyle.displayName = "div";

const routes = [
  {
    path: "/",
    exact: true,
    section: MapComponent
  }, {
    path: "/createMarker",
    section: MarkerCreatorComponent
  }
];

export const Main = ({
  ...props
}) => {
  console.log(props);
  return (<RowStyle>
    <ColStyle pathname={props.location.pathname} lg="3" md="12">
      <PanelComponent {...props}/>
    </ColStyle>
    <ColStyle pathname={props.location.pathname} lg="9" md="12">
      <Switch>
        {routes.map((route, id) => (<Route key={id} path={route.path} exact={route.exact} component={route.section}/>))}
      </Switch>
    </ColStyle>
  </RowStyle>);
}

export default Main;
