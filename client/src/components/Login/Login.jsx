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
import styled from "styled-components";
import { css } from "styled-components";

const Wrapper = styled.div`
  background: #f2f2f2;
  height: 100%;
  width: 100%;
  padding-top: 100px;
`;

const Inner = styled.div`
  width: 400px;
  border: 1px solid #6c757d;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.25rem;
`;

const Form = styled.form`
  padding: 20px;
`;

const FormGroup = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 10px;
  display: block;
  margin-left: 2px;
`;

const Label = styled.label`
  display: block;
  margin-left: 2px;
`;

const Button = css`
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

const RegisterBtn = styled.button`
  ${Button};
  background-color: ${props => (!props.status ? "#00b8e6" : "#4ddbff")};
`;

const LoginBtn = styled.button`
  ${Button};
  background-color: ${props => (props.status ? "#00b8e6" : "#4ddbff")};
`;

const SubmitBtn = styled.button`
  ${Button};
  background-color: #00b8e6;
  margin-top: 4px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #6c757d;
  width: 100%;
  height: 80px;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  display: block;
  border: 1px solid #ced4da;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      passwordError: "",
      userNameError: "",
      loginStatus: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    const createUser = this.props.createUser;
    const loginRequest = this.props.loginRequest;

    const user = {
      login: this.state.login,
      password: this.state.password
    };
    if (!err) {
      if (!this.state.loginStatus) {
        createUser(user);
        this.setState({
          login: "",
          password: ""
        });
      } else {
        loginRequest(user);
      }
    }
  };

  validate = () => {
    const registerError = this.props.registerError;
    const loginError = this.props.loginError;

    console.log(registerError);
    let isError = false;
    const errors = {
      loginError: "",
      userName: "",
      passwordError: "",
      userNameError: ""
    };

    const validateArray = [
      {
        condition: new RegExp("^(?=.*[A-Z])"),
        messageError:
          "The password must contain at least 1 uppercase alphabetical character"
      },
      {
        condition: new RegExp("(?=.*[0-9])"),
        messageError: "The password must contain at least 1 numeric character"
      },
      {
        condition: new RegExp("^(?=.*[a-z])"),
        messageError:
          "The password must contain at least 1 lowercase alphabetical character"
      },
      {
        condition: new RegExp("(?=.{8,})"),
        messageError: "The password must be minimum 8 characters or longer"
      }
    ];

    //REGISTER - Username
    if (registerError) {
      console.log(!this.state.loginStatus, registerError.response.status);
    }

    if (
      !this.state.loginStatus &&
      registerError &&
      registerError.response.status === 409
    ) {
      isError = true;
      errors.loginError = registerError.response.data.errorMessage;
    }

    console.log(!new RegExp("(?=.{4,})").test(this.state.login));
    if (
      !this.state.loginStatus &&
      !new RegExp("(?=.{4,})").test(this.state.login)
    ) {
      isError = true;
      errors.userNameError = "The login must be minimum 4 characters or longer";
    }

    //PASSWORD - REGISTER
    if (!this.state.loginStatus) {
      validateArray.forEach(validate => {
        if (!validate.condition.test(this.state.password)) {
          isError = true;
          errors.passwordError = validate.messageError;
        }
      });
    }

    //LOGIN - LogIn
    if (
      this.state.loginStatus &&
      loginError &&
      loginError.response.status === 401
    ) {
      isError = true;
      errors.loginError = loginError.response.data.errorMessage;
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  isLogin = status => {
    this.setState({
      loginStatus: status,
      login: "",
      password: "",
      passwordError: "",
      userNameError: ""
    });
  };

  render() {
    console.log(this.state, this.props);
    return (
      <Wrapper>
        <Inner>
          <ButtonWrapper>
            <RegisterBtn
              status={this.state.loginStatus}
              onClick={() => this.isLogin(false)}
            >
              Register
            </RegisterBtn>
            <LoginBtn
              status={this.state.loginStatus}
              onClick={() => this.isLogin(true)}
            >
              Login
            </LoginBtn>
          </ButtonWrapper>
          <Form>
            <FormGroup>
              <Label>Login</Label>
              <Input
                type="text"
                name="login"
                onChange={e => this.onChange(e)}
                value={this.state.login}
              />
              {!this.state.loginStatus &&
                this.state.userNameError && (
                  <ErrorMessage>{this.state.userNameError}</ErrorMessage>
                )}
              {!this.state.loginStatus &&
                this.props.registerError && (
                  <ErrorMessage>{this.props.registerError.response.data.errorMessage}</ErrorMessage>
                )}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={e => this.onChange(e)}
                value={this.state.password}
              />
              {this.state.passwordError &&
                !this.state.loginStatus && (
                  <ErrorMessage>{this.state.passwordError}</ErrorMessage>
                )}
              {this.props.loginError &&
                this.state.loginStatus && (
                  <ErrorMessage>
                    {this.props.loginError.response.data.errorMessage}
                  </ErrorMessage>
                )}
            </FormGroup>
            <FormGroup>
              <SubmitBtn onClick={e => this.onSubmit(e)}>
                {this.state.loginStatus ? "Authorization" : "Create Account"}
              </SubmitBtn>
            </FormGroup>
          </Form>
        </Inner>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  createUser,
  loginRequest
};

const mapStateToProps = state => ({
  isAuthorized: state.account.isAuthorized,
  userId: state.account.userId,
  registerError: state.user.error,
  loginError: state.account.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
