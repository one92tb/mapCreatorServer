import React from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions/createUser";
import { loginRequest } from "../../actions/loginRequest";
import styled from "styled-components";
import { css } from "styled-components";
import { errors, registerValidationDetails } from "../../schema/registerSchema";
import validate from "../../validate.js";

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
