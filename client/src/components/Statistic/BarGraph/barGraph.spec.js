import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { BarGraph } from "./BarGraph";

describe("bar graph component", () => {
  let wrapper;

  it("passess all props to barGraph component", () => {

    const displayMarkers = jest.fn(() => {
      return [["test1", 1], ["test2", 2]];
    });
    
    wrapper = shallow(<BarGraph displayMarkers={displayMarkers} />);
    expect(wrapper).toMatchSnapshot();
  });
});
