import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { createUser } from "../../actions/createUser";
import { loginRequest } from "../../actions/loginRequest";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      loginStatus: false,
      userId: "",
      isAuthorized: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isAuthorized && this.props.userId) {
      console.log("oh yea!");
      this.setState({
        userId: this.props.userId,
        isAuthorized: true
      }),
        () => {
          console.log(this.state);
        };
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const createUser = this.props.createUser;
    const loginRequest = this.props.loginRequest;

    const user = {
      login: this.state.login,
      password: this.state.password
    };

    !this.state.loginStatus ? createUser(user) : loginRequest(user);

    console.log(this.props);
  };

  isLogin = status => {
    this.setState({
      loginStatus: status
    });
  };

  render() {
    console.log(this.state.isAuthorized, "state", this.state);
    if (this.state.isAuthorized) {
      console.log("tak");
      return <Redirect to={{ pathname: "/map" }} />;
    } else {
      console.log("nie");
    }
    return (
      <div>
        <button onClick={() => this.isLogin(false)}>Register</button>
        <button onClick={() => this.isLogin(true)}>Login</button>
        <form>
          <input
            type="text"
            name="login"
            onChange={e => this.onChange(e)}
            value={this.state.user}
          />
          <input
            type="text"
            name="password"
            onChange={e => this.onChange(e)}
            value={this.state.password}
          />
          <button onClick={e => this.onSubmit(e)}>
            {this.state.loginStatus ? "Authorization" : "Create Account"}
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createUser,
  loginRequest
};

const mapStateToProps = state => ({
  isAuthorized: state.account.isAuthorized,
  userId: state.account.userId
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
