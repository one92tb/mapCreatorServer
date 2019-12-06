import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import decode from "jwt-decode";
import { MemoryRouter } from "react-router";
import LocalStorageMock from "../../../mocks/localStorageMock";
import { Provider } from "react-redux";
import { Auth, AuthAdmin, checkAuth, AppContent, AuthApp } from "./Auth";
import Login from "../Login/Login";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});
global.localStorage = new LocalStorageMock();

describe("auth", () => {
  localStorage.setItem("token", "fake_token_user");
  const token = localStorage.getItem("token");
  it("allows the user to login successfully", async () => {
    console.log(token);

    const checkAuth = jest.fn(() => true);
  });
});
