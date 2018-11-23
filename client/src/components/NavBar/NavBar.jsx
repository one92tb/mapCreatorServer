import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { isNavSelect } from "../../actions/isNavSelect";
import { getSelectedMarker } from "../../actions/getSelectedMarker";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/logout";

const Panel = styled.div`
  height: 100%;
  background: #4ddbff;
`;
const Header = styled.div`
  display: flex;
  padding-top: 30px;
  margin-bottom: 70px;
  justify-content: center;
`;
const Logo = styled.img`
  margin-right: 5px;
`;

const Title = styled.h1`
  font-size: 26px;
  display: flex;
  align-items: center;
`;
const User = styled.div``;

const LoginImg = styled.img`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;
const LoginName = styled.span`
  display: block;
  text-align: center;
  margin-top: 20px;
`;

const Nav = styled.ul`
  margin-top: 60px;
  padding-left: 0;
`;

const NavItem = styled.li`
  list-style-type: none;
  margin: 5px 0;
  height: 50px;
  display: flex;
  align-items: center;
  width: 90%
  margin-left: auto;
  margin-right: auto;


  &:hover{
    background: #00b8e6;
  }
`;

const activeClassName = "nav-item-active";

const NavLink = styled(Link).attrs({ activeClassName })`
  color: #000;
  font-size: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 5px;
  color: #000;

  &:hover {
    text-decoration-line: none;
    color: #000;
  }

  &.${activeClassName} {
    background: #00b8e6;
  }
`;

const Icon = styled.img`
  margin-right: 5px;
`;

const LogoutBtn = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  background: #00b8e6;
  cursor: pointer;
  height: 40px;
  width: 165px;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00b8e6;
  color: #fff;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

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
    this.props.getSelectedMarker("");
  };

  handleMapCreator = () => {
    this.props.isNavSelect(true);
  };

  render() {
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
        <Logout logOutFromApp={this.props.logout} />
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
