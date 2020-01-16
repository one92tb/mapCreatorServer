import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import { MemoryRouter } from "react-router";
import LocalStorageMock from "../../../../mocks/localStorageMock";
import { Provider } from "react-redux";
import { authAdmin, AuthAdmin } from "./AuthAdmin";
import decode from "jwt-decode";
import NoAuthorization from "../../NoAuthorization/NoAuthorization";
import Users from "../../Users/Users";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initState = {
  user: {
    users: [
      {
        id: 1,
        login: "one92tb",
        password: "sdadsadas",
        isAdmin: true
      }
    ]
  }
};
const store = mockStore(initState);

jest.mock("jwt-decode", () => jest.fn());

global.localStorage = new LocalStorageMock();

describe("appContent", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("test authAdmin when user has admin privilege", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");

    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 - 1,
        iat: 1575751766,
        userData: { isAdmin: true, login: "one92tb", userId: 1 }
      };
    });

    expect(authAdmin()).toBe(true);
  });

  it("test authAdmin without token", () => {
    localStorage.setItem("token", "");
    const token = localStorage.getItem("token");

    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 - 1,
        iat: 1575751766,
        userData: { isAdmin: true, login: "one92tb", userId: 1 }
      };
    });

    expect(authAdmin()).toBe(false);
  });

  it("test user without admin priviliege", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");

    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 - 1,
        iat: 1575751766,
        userData: { isAdmin: false, login: "one92tb", userId: 1 }
      };
    });

    expect(authAdmin()).toBe(false);
  });

  it("userdata is not defined", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");

    expect(authAdmin()).toBe(false);
  });

  it("appContent - open Users component", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");

    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 - 1,
        iat: 1575751766,
        userData: { isAdmin: true, login: "one92tb", userId: 1 }
      };
    });

    let wrapper = mount(
      <MemoryRouter initialEntries={["/users"]}>
        <Provider store={store}>
          <AuthAdmin />
        </Provider>
      </MemoryRouter>
    );

    expect(wrapper.find(Users)).toHaveLength(1);
  });

  it("appContent - redirect to NoAuthorization component", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");

    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 - 1,
        iat: 1575751766,
        userData: { isAdmin: false, login: "one92tb", userId: 1 }
      };
    });

    let wrapper = mount(
      <MemoryRouter initialEntries={["/users"]}>
        <Provider store={store}>
          <AuthAdmin />
        </Provider>
      </MemoryRouter>
    );

    expect(wrapper.find(NoAuthorization)).toHaveLength(1);
  });
});
