import React, {Component} from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './CSS/panel.css'
import MarkerList from './markerList';
import MarkerFilter from './markerFilter';
import {Link, BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <MarkerList/>
  }, {
    path: "/selectMarker",
    sidebar: () => <MarkerList/>
  }, {
    path: "/filterMarker",
    sidebar: () => <MarkerFilter/>
  }
];

class Panel extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (<Card className="panelCard">
      <CardHeader>
        <Nav>
          <NavItem>
            <NavLink tag={Link} to='/selectMarker'>Select Marker</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/filterMarker'>Fileter Marker</NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody>
        <Switch>
          {routes.map((route, id) => (<Route key={id} path={route.path} exact={route.exact} component={route.sidebar}/>))}
        </Switch>
      </CardBody>
    </Card>);
  }
}

export default Panel;
