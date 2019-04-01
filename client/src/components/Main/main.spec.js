import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Main } from "./Main";

describe("main component", () => {
  it("shallow main component", () => {
    let wrapper;

    wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });
});
