import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { List } from "./List";

describe("list component", () => {
  it("first test", () => {
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];
    const indicators = [
      {
        city: " 58-512",
        country: " Polska",
        icon: "1548784752159.png",
        id: 2,
        lat: 50.92841093800815,
        lng: 15.640584390869208,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      },
      {
        city: " 58-500",
        country: " Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      }
    ];

    const wrapper = shallow(<List markers={markers} indicators={indicators}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
