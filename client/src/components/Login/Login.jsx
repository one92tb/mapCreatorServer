import React from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions/createUser";
import { loginRequest } from "../../actions/loginRequest";
import { errors, registerValidationDetails } from "../../schema/registerSchema";
import validate from "../../validate.js";
import {
  Wrapper,
  Inner,
  ButtonWrapper,
  RegisterBtn,
  LoginBtn,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitBtn
} from "./style";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      loginError: "",
      password: "",
      passwordError: "",
      loginStatus: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    const { login, password, loginStatus } = this.state;
    const { createUser, loginRequest } = this.props;
    const data = {
      login,
      password,
      loginStatus
    };
    const validationResult = validate(errors, registerValidationDetails, data);
    const err = validationResult.isError;
    const user = {
      login,
      password
    };

    e.preventDefault();

    if (!err) {
      if (!loginStatus) {
        createUser(user);
      } else {
        loginRequest(user);
      }
    }

    this.setState({
      ...validationResult.errors
    });
  };

  isLogin = status => {
    this.setState({
      loginStatus: status,
      login: "",
      loginError: "",
      password: "",
      passwordError: ""
    });
  };

  render() {
    console.log(this.state);
    const {
      login,
      password,
      loginStatus,
      loginError,
      passwordError
    } = this.state;
    const { registerError, authError } = this.props;

    return (
      <Wrapper>
        <Inner>
          <ButtonWrapper>
            <RegisterBtn
              status={loginStatus}
              onClick={() => this.isLogin(false)}
            >
              Register
            </RegisterBtn>
            <LoginBtn status={loginStatus} onClick={() => this.isLogin(true)}>
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
                value={login}
                autocomplete="login"
              />
              {!loginStatus &&
                loginError && <ErrorMessage>{loginError}</ErrorMessage>}
              {!loginStatus &&
                registerError && (
                  <ErrorMessage>
                    {registerError.response.data.errorMessage}
                  </ErrorMessage>
                )}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={e => this.onChange(e)}
                value={password}
                autocomplete={loginStatus ? "current password" : "new-password"}
              />

              {passwordError &&
                !loginStatus && <ErrorMessage>{passwordError}</ErrorMessage>}
              {authError &&
                loginStatus && (
                  <ErrorMessage>
                    {authError.response.data.errorMessage}
                  </ErrorMessage>
                )}
            </FormGroup>
            <FormGroup>
              <SubmitBtn onClick={e => this.onSubmit(e)}>
                {loginStatus ? "Authorization" : "Create Account"}
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
  authError: state.account.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
