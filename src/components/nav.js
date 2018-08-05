import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import './CSS/nav.css'
import {
  Link,
} from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (<Nav>
      <NavItem>
        <NavLink tag={Link} to='/'>Map</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to='/createMarker'>Create Marker</NavLink>
      </NavItem>
      <NavItem className="inputSearchCity">
        <InputGroup>
          <Input placeholder="search city"/>
          <InputGroupAddon addonType="append">search</InputGroupAddon>
        </InputGroup>
      </NavItem>
    </Nav>);
  }
}

export default NavBar;
