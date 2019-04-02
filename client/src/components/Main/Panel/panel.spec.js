import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { Panel } from "./Panel";
import history from "../../../history";

describe("panel component", () => {
  let wrapper;

  it("passess all props to panel component", () => {
    const isPanelSelect = jest.fn();
    const history = {
      location: {
        pathname: "/",
        search: "",
        hash: "",
        state: undefined,
        key: "pncigm"
      }
    };

    wrapper = shallow(<Panel isPanelSelect={isPanelSelect} {...history} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("component did update - change location", () => {
    const isPanelSelect = jest.fn();
    const history = {
      location: {
        pathname: "/",
        search: "",
        hash: "",
        state: undefined,
        key: "pncigm"
      }
    };

    wrapper = shallow(<Panel isPanelSelect={isPanelSelect} {...history} />);

    wrapper.setState({
      isSelected: false
    });
    wrapper.setProps({
      location: {
        pathname: "/createMarker",
        search: "",
        hash: "",
        state: undefined,
        key: "pncigm"
      }
    });

    expect(wrapper.state().isSelected).toBe(true);
  });

  it("handleCheckBox method - change checked in state", () => {
    const isPanelSelect = jest.fn();
    const history = {
      location: {
        pathname: "/",
        search: "",
        hash: "",
        state: undefined,
        key: "pncigm"
      }
    };

    wrapper = shallow(<Panel isPanelSelect={isPanelSelect} {...history} />);

    const input = wrapper.find("input");

    input.simulate("change", {
      target: {
        checked: true
      }
    });

    expect(wrapper.state().checked).toBe(true);

    input.simulate("change", {
      target: {
        checked: false
      }
    });

    expect(wrapper.state().checked).toBe(false);
  });

  it("switch method - change select marker to filter marker and vice versa", () => {
    const isPanelSelect = jest.fn();
    const history = {
      location: {
        pathname: "/",
        search: "",
        hash: "",
        state: undefined,
        key: "pncigm"
      }
    };

    wrapper = shallow(<Panel isPanelSelect={isPanelSelect} {...history} />);

    const selectLink = wrapper.find("a").first();
    const filterLink = wrapper.find("a").at(1);

    selectLink.simulate("click", true);
    expect(wrapper.state().isSelected).toBe(true);
    filterLink.simulate("click", false);
    expect(wrapper.state().isSelected).toBe(false);
    expect(isPanelSelect).toHaveBeenCalledTimes(2);
  });
});
