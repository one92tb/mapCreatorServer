import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { NoAuthorization } from "./NoAuthorization";

describe("no authorization component", () => {
  it("shallow authorization component", () => {
    let wrapper;

    wrapper = shallow(<NoAuthorization />);
    expect(wrapper).toMatchSnapshot();
  });
});
