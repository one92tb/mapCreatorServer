import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import { MemoryRouter } from "react-router";
import LocalStorageMock from "../../../../mocks/localStorageMock";
import { Provider } from "react-redux";
//import { Auth, checkAuth, authAdmin, AppContent, AuthApp } from "../Auth";
import { AuthApp, checkAuth } from "./AuthApp";
import Login from "../../Login/Login";
import decode from "jwt-decode";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

jest.mock("jwt-decode", () => jest.fn());

global.localStorage = new LocalStorageMock();

describe("auth", () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("allows the user to login successfully", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");

    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 + 1,
        iat: 1575751766,
        userData: { isAdmin: true, login: "one92tb", userId: 1 }
      };
    });

    expect(token).toBe("fake_token_user");
    expect(checkAuth()).toBe(true);
  });

  it("test without token", () => {
    localStorage.setItem("token", "");
    const token = localStorage.getItem("token");
    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 + 1,
        iat: 1575751766,
        userData: { isAdmin: true, login: "one92tb", userId: 1 }
      };
    });

    expect(checkAuth()).toBe(false);
  });

  it("expired time value less than Date", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");
    decode.mockImplementationOnce(token => {
      return {
        exp: new Date().getTime() / 1000 - 1,
        iat: 1575751766,
        userData: { isAdmin: true, login: "one92tb", userId: 1 }
      };
    });
  
    expect(checkAuth()).toBe(false);
  });

  it("exp is not defined", () => {
    localStorage.setItem("token", "fake_token_user");
    const token = localStorage.getItem("token");

    expect(checkAuth()).toBe(false);
  });
});
