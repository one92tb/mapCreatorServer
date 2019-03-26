import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { PieGraph } from "./PieGraph";

describe(" pie graph component", () => {
  let wrapper;

  it("passes all props to pieGraph component", () => {
    const displayMarkers = jest.fn(() => {
      return [["All markers", 2]];
    });

    wrapper = shallow(<PieGraph displayMarkers={displayMarkers} />);
    expect(wrapper).toMatchSnapshot();
  });
});
