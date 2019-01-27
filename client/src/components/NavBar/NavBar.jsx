import React, { Component } from "react";
import { connect } from "react-redux";
import { isPanelSelect } from "../../actions/isPanelSelect";
import { getSelectedMarker } from "../../actions/marker/getSelectedMarker";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/signIn/logout";
import PropTypes from "prop-types";
import {
  LogoutBtn,
  Header,
  Logo,
  Title,
  User,
  LoginImg,
  LoginName,
  Input,
  Nav,
  NavItem,
  NavLink,
  Icon,
  Label,
  Panel,
  ResponsiveMenu,
  ResponsiveNav
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

const routes = [
  {
    name: "Map",
    path: "/",
    exact: true,
    icon: "map.png"
  },
  {
    name: "Create Marker",
    path: "/createMarker",
    icon: "gps.png"
  },
  {
    name: "Statistic",
    path: "/statistic",
    icon: "graph.png"
  },
  {
    name: "List",
    path: "/list",
    icon: "list.png"
  },
  {
    name: "Users",
    path: "/users",
    icon: "users.png"
  }
];

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }
  handleCheckBox = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  handleNavLink = path => {
    const { isPanelSelect, getSelectedMarker } = this.props;

    this.setState({
      checked: false
    });

    if (path === "/") {
      getSelectedMarker("");
    } else if (path === "/createMarker") {
      getSelectedMarker("");
      isPanelSelect(true);
    }
  };

  render() {
    const { logout } = this.props;
    return (
      <Panel>
        <ResponsiveMenu>
          <Header>
            <Logo src={"earth.png"} />
            <Title className="logoName">mapCreator</Title>
          </Header>
          <Label htmlFor="toggle">&#9776;</Label>
          <Input type="checkbox" id="toggle" onChange={this.handleCheckBox} />
        </ResponsiveMenu>
        <ResponsiveNav isChecked={this.state.checked}>
          <User>
            <LoginImg src={"user.png"} />
            <LoginName>UserNick</LoginName>
          </User>
          <Logout logOutFromApp={logout} />
          <Nav>
            {routes.map((route, id) => (
              <NavItem key={id}>
                <NavLink
                  onClick={() => this.handleNavLink(route.path)}
                  to={route.path}
                  exact={route.exact}
                  activeClassName={activeClassName}
                >
                  <Icon src={route.icon} /> {route.name}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </ResponsiveNav>
      </Panel>
    );
  }
}

const mapDispatchToProps = {
  isPanelSelect,
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

NavBar.propTypes = {
  isPanelSelect: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
