import React from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions/user/createUser";
import { resetRegisterError } from "../../actions/user/resetRegisterError";
import { loginRequest } from "../../actions/signIn/loginRequest";
import { resetLoginError } from "../../actions/signIn/resetLoginError";
import { errors, registerValidationDetails } from "../../schema/registerSchema";
import validate from "../../validate.js";
import PropTypes from "prop-types";
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
      loginStatus: true
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    const { login, password, loginStatus } = this.state;
    const {
      createUser,
      loginRequest,
      resetRegisterError,
      resetLoginError
    } = this.props;
    const data = {
      login,
      password,
      loginStatus
    };
    const validationResult = validate(errors, registerValidationDetails, data);

    const user = {
      login,
      password
    };

    e.preventDefault();
    resetRegisterError();
    resetLoginError();

    !validationResult.isError && !loginStatus
      ? createUser(user)
      : loginRequest(user);

    this.setState({
      ...validationResult.errors
    });
  };

  isLogin = status => {
    const { resetRegisterError, resetLoginError } = this.props;
    this.setState({
      loginStatus: status,
      login: "",
      loginError: "",
      password: "",
      passwordError: ""
    });

    resetRegisterError();
    resetLoginError();
  };

  render() {
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
            <LoginBtn status={loginStatus} onClick={() => this.isLogin(true)}>
              Login
            </LoginBtn>
            <RegisterBtn
              status={loginStatus}
              onClick={() => this.isLogin(false)}
            >
              Register
            </RegisterBtn>
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
  loginRequest,
  resetLoginError,
  resetRegisterError
};

const mapStateToProps = state => ({
  isAuthorized: state.account.isAuthorized,
  registerError: state.user.error,
  authError: state.account.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

Login.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  resetLoginError: PropTypes.func.isRequired,
  resetRegisterError: PropTypes.func.isRequired
};

Login.defaultProps = {
  registerError: {},
  authError: {}
};
