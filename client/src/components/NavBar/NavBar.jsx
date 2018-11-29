import React, { Component } from "react";
import { connect } from "react-redux";
import { isNavSelect } from "../../actions/isNavSelect";
import { getSelectedMarker } from "../../actions/getSelectedMarker";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/logout";
import {
  LogoutBtn,
  Panel,
  Header,
  Logo,
  Title,
  User,
  LoginImg,
  LoginName,
  Nav,
  NavItem,
  NavLink,
  Icon
} from "./style";

const activeClassName = "nav-item-active";

const Logout = withRouter(({ history, logOutFromApp }) => {
  return (
    <LogoutBtn
      onClick={() => {
        logOutFromApp({
          userId: "",
          userName: "",
          error: "",
          isAuthorized: false
        });
        localStorage.removeItem("token");
        history.push("/login");
      }}
    >
      Sign out
    </LogoutBtn>
  );
});

class NavBar extends Component {
  handleMap = () => {
    const { getSelectedMarker } = this.props;
    getSelectedMarker("");
  };

  handleMapCreator = () => {
    const { isNavSelect } = this.props;
    isNavSelect(true);
  };

  render() {
    const { logout } = this.props;
    return (
      <Panel>
        <Header>
          <Logo src={"earth.png"} width={50} height={50} />
          <Title className="logoName">mapCreator</Title>
        </Header>
        <User>
          <LoginImg src={"user.png"} width={130} height={130} />
          <LoginName>UserNick</LoginName>
        </User>
        <Logout logOutFromApp={logout} />
        <Nav>
          <NavItem>
            <NavLink
              onClick={this.handleMap}
              to="/"
              exact={true}
              activeClassName={activeClassName}
            >
              <Icon src={"map.png"} width={32} height={32} /> Map
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={this.handleMapCreator}
              to="/createMarker"
              activeClassName={activeClassName}
            >
              <Icon src={"gps.png"} width={32} height={32} />Create Marker
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/statistic" activeClassName={activeClassName}>
              <Icon src={"graph.png"} width={32} height={32} />Statistic
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/list" activeClassName={activeClassName}>
              <Icon src={"list.png"} width={32} height={32} />List
            </NavLink>
          </NavItem>
        </Nav>
      </Panel>
    );
  }
}

const mapDispatchToProps = {
  isNavSelect,
  getSelectedMarker,
  logout
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(NavBar);
