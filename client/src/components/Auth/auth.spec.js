import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import { MemoryRouter } from "react-router";
import LocalStorageMock from "../../../mocks/localStorageMock";
import { Provider } from "react-redux";
import { Auth } from "./Auth";
import Login from "../Login/Login";
import decode from "jwt-decode";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initState = {
  account: {
    isAuthorized: false,
    error: {
      response: {
        data: {
          errorMessage: "auth Error"
        }
      }
    }
  },
  user: {
    registerError: {
      response: {
        data: {
          errorMessage: "register Error"
        }
      }
    },
    registerSuccess: "register Success"
  }
};
const store = mockStore(initState);

jest.mock("jwt-decode", () => jest.fn());

global.localStorage = new LocalStorageMock();

describe("auth", () => {
  it("auth", () => {
    let wrapper = mount(
      <MemoryRouter initialEntries={["/login"]}>
        <Provider store={store}>
          <Auth />
        </Provider>
      </MemoryRouter>
    );

    expect(wrapper.find(Login)).toHaveLength(1);
  });
});
