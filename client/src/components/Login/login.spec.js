import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { Login } from "./Login";
import validate from "../../validate.js";
import { errors, registerValidationDetails } from "../../schema/registerSchema";

describe("login component", () => {
  let wrapper;

  it("passses all props to Login component", () => {
    const createUser = jest.fn();
    const loginRequest = jest.fn();
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("onChange", () => {
    const createUser = jest.fn();
    const loginRequest = jest.fn();
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );

    const loginInput = wrapper.find("input").first();
    const passwordInput = wrapper.find("input").at(1);

    loginInput.simulate("change", {
      target: {
        name: "login",
        value: "user1"
      }
    });
    passwordInput.simulate("change", {
      target: {
        name: "password",
        value: "asd123"
      }
    });

    expect(wrapper.instance().state.login).toBe("user1");
    expect(wrapper.instance().state.password).toBe("asd123");
  });

  it("onSubmit - create user (success)", () => {
    const createUser = jest.fn();
    const loginRequest = jest.fn();
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );
    wrapper.setState({
      loginStatus: false
    });
    const submitBtn = wrapper.find("button").at(2);

    wrapper.setState({
      login: "user1",
      password: "asd123AAAAA"
    });

    submitBtn.simulate("click", { preventDefault() {} });

    expect(createUser).toHaveBeenCalledTimes(1);
    expect(resetRegisterError).toHaveBeenCalledTimes(1);
    expect(resetRegisterSuccess).toHaveBeenCalledTimes(1);
    expect(resetLoginError).toHaveBeenCalledTimes(1);
  });

  it("onSubmit - create user (failure - validation)", () => {
    const createUser = jest.fn();
    const loginRequest = jest.fn();
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );
    wrapper.setState({
      login: "us",
      password: "",
      loginStatus: false
    });

    const submitBtn = wrapper.find("button").at(2);

    submitBtn.simulate("click", { preventDefault() {} });

    expect(wrapper.instance().state.loginError).toBe(
      "The login must be minimum 4 characters or longer"
    );
    expect(wrapper.instance().state.passwordError).toBe(
      "The password must be minimum 8 characters or longer"
    );
    expect(resetRegisterError).toHaveBeenCalledTimes(1);
    expect(resetRegisterSuccess).toHaveBeenCalledTimes(1);
    expect(resetLoginError).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledTimes(0);
  });

  it("onSubmit - create user (user is exist)", () => {
    const createUser = jest.fn(() => {
      wrapper.setProps({
        registerError: {
          response: {
            data: {
              registerError: "This login is exist"
            }
          }
        }
      });
    });
    const loginRequest = jest.fn();
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );
    wrapper.setState({
      login: "user123",
      password: "asd123456G",
      loginStatus: false
    });

    const submitBtn = wrapper.find("button").at(2);

    submitBtn.simulate("click", { preventDefault() {} });

    expect(createUser).toHaveBeenCalledTimes(1);
    expect(
      wrapper.instance().props.registerError.response.data.registerError
    ).toBe("This login is exist");
  });

  it("onSubmit - login request (success)", () => {
    const createUser = jest.fn();
    const loginRequest = jest.fn();
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );

    const submitBtn = wrapper.find("button").at(2);

    wrapper.setState({
      login: "user1",
      password: "asd123"
    });

    submitBtn.simulate("click", { preventDefault() {} });

    expect(resetRegisterError).toHaveBeenCalledTimes(1);
    expect(resetRegisterSuccess).toHaveBeenCalledTimes(1);
    expect(resetLoginError).toHaveBeenCalledTimes(1);
    expect(loginRequest).toHaveBeenCalledTimes(1);
  });

  it("onSubmit - login request (failure)", () => {
    const createUser = jest.fn();
    const loginRequest = jest.fn(() => {
      wrapper.setProps({
        authError: {
          response: {
            data: {
              errorMessage: "login or password is incorrect"
            }
          }
        }
      });
    });
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );

    wrapper.setState({
      login: "user1",
      password: "asd123"
    });

    const submitBtn = wrapper.find("button").at(2);
    submitBtn.simulate("click", { preventDefault() {} });

    expect(loginRequest).toHaveBeenCalledTimes(1);
  });

  it("isLogin method - change status from login to register", () => {
    const createUser = jest.fn();
    const loginRequest = jest.fn();
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );

    const registerBtn = wrapper.find("button").at(1);
    registerBtn.simulate("click");
    expect(wrapper.state().loginStatus).toBe(false);
  });

  it("isLogin method - change status from register to login", () => {
    const createUser = jest.fn();
    const loginRequest = jest.fn();
    const resetLoginError = jest.fn();
    const resetRegisterError = jest.fn();
    const resetRegisterSuccess = jest.fn();
    const isAuthorized = false;
    const authError = null;
    const registerError = null;
    const registerSuccess = "";

    wrapper = shallow(
      <Login
        createUser={createUser}
        loginRequest={loginRequest}
        resetLoginError={resetLoginError}
        resetRegisterError={resetRegisterError}
        resetRegisterSuccess={resetRegisterSuccess}
        isAuthorized={isAuthorized}
        authError={authError}
        registerError={registerError}
        registerSuccess={registerSuccess}
      />
    );

    wrapper.setState({
      loginStatus: false
    });

    const loginBtn = wrapper.find("button").first();
    loginBtn.simulate("click");
    expect(wrapper.state().loginStatus).toBe(true);
  });
});
