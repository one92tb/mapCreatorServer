import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { shallowToJson } from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { Map, MapWithAMakredInfoWindow } from "./Map";
import ShallowRenderer from "react-test-renderer/shallow";

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const {
  compose,
  withProps,
  withStateHandlers,
  lifecycle
} = require("recompose");

const _ = require("lodash");

describe("map component", () => {
  let wrapper;

  it("passess all props to map component", () => {
    const fetchIndicators = jest.fn();
    const postIndicator = jest.fn();
    const removeIndicator = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1
    };
    const indicators = [
      {
        city: "Jelenia Góra 58-500",
        country: "Polska",
        icon: "1548784752159.png",
        id: 2,
        lat: 50.92841093800815,
        lng: 15.640584390869208,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      },
      {
        city: "Jelenia Góra 58-500",
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
    const disableMarkers = [];
    const selectedIndicator = "";
    const isNavSelect = true;

    wrapper = shallow(
      <Map
        fetchIndicators={fetchIndicators}
        postIndicator={postIndicator}
        removeIndicator={removeIndicator}
        indicators={indicators}
        isNavSelect={isNavSelect}
        selectedMarker={selectedMarker}
        disableMarkers={disableMarkers}
        selectedIndicator={selectedIndicator}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("passess all props to MapWithAMakredInfoWindow component", () => {
    const props = {
      containerElement: (
        <div
          style={{
            height: `100%`
          }}
        />
      ),
      loadingElement: (
        <div
          style={{
            height: `100%`
          }}
        />
      ),
      mapElement: (
        <div
          style={{
            height: `100%`
          }}
        />
      ),
      fetchIndicators: jest.fn(),
      postIndicator: jest.fn(),
      removeIndicator: jest.fn(),
      selectedMarker: {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      indicators: [
        {
          city: "Jelenia Góra 58-500",
          country: "Polska",
          icon: "1548784752159.png",
          id: 2,
          lat: 50.92841093800815,
          lng: 15.640584390869208,
          name: "test1",
          street: "Unnamed Road",
          userId: 1
        },
        {
          city: "Jelenia Góra 58-500",
          country: " Polska",
          icon: "1548784752159.png",
          id: 3,
          lat: 50.933387715648635,
          lng: 15.840054910888739,
          name: "test1",
          street: "Unnamed Road",
          userId: 1
        }
      ],
      disableMarkers: [],
      selectedIndicator: "",
      isNavSelect: true
    };

    const renderer = new ShallowRenderer();
    renderer.render(<MapWithAMakredInfoWindow {...props} />);
    const result = renderer.getRenderOutput();
    console.log(result);
    expect(result).toMatchSnapshot();
  });
});
