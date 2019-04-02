import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { NavBar, Logout } from "./NavBar";
import { Router } from "react-router-dom";
import history from "../../history";
import ReactRouterEnzymeContext from "react-router-enzyme-context";
import LocalStorageMock from "../../../mocks/localStorageMock";

global.localStorage = new LocalStorageMock();

describe("navBar component", () => {
  let wrapper;

  it("passess all props to navBar component", () => {
    const getSelectedMarker = jest.fn();
    const isPanelSelect = jest.fn();
    const logout = jest.fn();
    const redirect = jest.fn();

    wrapper = shallow(
      <NavBar
        getSelectedMarker={getSelectedMarker}
        isPanelSelect={isPanelSelect}
        logout={logout}
        redirect={redirect}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("handle checkBox method - change status", () => {
    const getSelectedMarker = jest.fn();
    const isPanelSelect = jest.fn();
    const logout = jest.fn();
    const redirect = jest.fn();
    wrapper = shallow(
      <NavBar
        getSelectedMarker={getSelectedMarker}
        isPanelSelect={isPanelSelect}
        logout={logout}
        redirect={redirect}
      />
    );

    const toggleInput = wrapper.find("input");

    toggleInput.simulate("change");
    expect(wrapper.instance().state.checked).toBe(true);
    toggleInput.simulate("change");
    expect(wrapper.instance().state.checked).toBe(false);
  });

  it("handle navLink method - click first link", () => {
    const getSelectedMarker = jest.fn();
    const isPanelSelect = jest.fn();
    const logout = jest.fn();
    const redirect = jest.fn();
    const mockRouter = new ReactRouterEnzymeContext();

    wrapper = mount(
      <NavBar
        getSelectedMarker={getSelectedMarker}
        isPanelSelect={isPanelSelect}
        logout={logout}
        redirect={redirect}
      />,
      mockRouter
    );

    const li = wrapper.find("a").first();
    li.simulate("click");
    expect(getSelectedMarker).toHaveBeenCalledTimes(1);
    expect(wrapper.state().checked).toBe(false);
    expect(isPanelSelect).toHaveBeenCalledTimes(0);
  });

  it("handle navLink method - click second link", () => {
    const getSelectedMarker = jest.fn();
    const isPanelSelect = jest.fn();
    const logout = jest.fn();
    const redirect = jest.fn();
    const mockRouter = new ReactRouterEnzymeContext();

    wrapper = mount(
      <NavBar
        getSelectedMarker={getSelectedMarker}
        isPanelSelect={isPanelSelect}
        logout={logout}
        redirect={redirect}
      />,
      mockRouter
    );

    const li = wrapper.find("a").at(2);
    li.simulate("click");
    expect(getSelectedMarker).toHaveBeenCalledTimes(1);
    expect(wrapper.state().checked).toBe(false);
    expect(isPanelSelect).toHaveBeenCalledTimes(1);
  });

  it("handle Logout method", () => {
    const getSelectedMarker = jest.fn();
    const isPanelSelect = jest.fn();
    const logout = jest.fn();
    const redirect = jest.fn();

    wrapper = shallow(
      <NavBar
        getSelectedMarker={getSelectedMarker}
        isPanelSelect={isPanelSelect}
        logout={logout}
        redirect={redirect}
      />
    );

    const logOutBtn = wrapper.find("button");
    console.log(logOutBtn.html());
    logOutBtn.simulate("click");

    expect(logout).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith("/login");
  });
});
