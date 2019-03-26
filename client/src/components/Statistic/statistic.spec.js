import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { Statistic } from "./Statistic";

describe("statistic component", () => {
  let wrapper;

  it("passess all props to Statistic component", () => {
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
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      }
    ];

    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();

    wrapper = shallow(
      <Statistic
        markers={markers}
        indicators={indicators}
        fetchMarkers={fetchMarkers}
        fetchIndicators={fetchIndicators}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("componentDidMount", () => {
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
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      }
    ];

    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();

    wrapper = shallow(
      <Statistic
        markers={markers}
        indicators={indicators}
        fetchMarkers={fetchMarkers}
        fetchIndicators={fetchIndicators}
      />
    );

    expect(fetchIndicators).toHaveBeenCalledTimes(1);
    expect(fetchMarkers).toHaveBeenCalledTimes(1);
  });

  it("handle change city", () => {
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
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      },
      {
        city: "Wrocław",
        country: "Polska",
        icon: "123123213.png",
        id: 4,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];

    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();

    wrapper = shallow(
      <Statistic
        markers={markers}
        indicators={indicators}
        fetchMarkers={fetchMarkers}
        fetchIndicators={fetchIndicators}
      />
    );

    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "Jelenia Góra" } });
    expect(input.props().name).toEqual("city");
    expect(wrapper.state().city).toEqual("Jelenia Góra");
  });

  it("sumEachIndicator method for Jelenia Góra", () => {
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
        city: "Jelenia Góra 58-500",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      },
      {
        city: "Wrocław",
        country: "Polska",
        icon: "123123213.png",
        id: 4,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();

    wrapper = shallow(
      <Statistic
        markers={markers}
        indicators={indicators}
        fetchMarkers={fetchMarkers}
        fetchIndicators={fetchIndicators}
      />
    );

    const { city } = wrapper.instance().state;
    const expectedResult = [["test1", 1]];

    wrapper.setState({ city: "Jelenia Góra" });
    expect(wrapper.instance().sumEachIndicator()).toEqual(expectedResult);
  });

  it("sumEachIndicator method for all indicators", () => {
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
        city: "Jelenia Góra 58-500",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      },
      {
        city: "Wrocław",
        country: "Polska",
        icon: "123123213.png",
        id: 4,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      },
      {
        city: "Wrocław",
        country: "Polska",
        icon: "12323213.png",
        id: 5,
        lat: 50.9332387715648635,
        lng: 15.832054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();

    wrapper = shallow(
      <Statistic
        markers={markers}
        indicators={indicators}
        fetchMarkers={fetchMarkers}
        fetchIndicators={fetchIndicators}
      />
    );
    wrapper.setState({ city: "" });
    const { city } = wrapper.instance().state;

    const result1 = indicators.filter((indicator, id, arr) => {
      return (
        (city === "" ||
          indicator.city.toLowerCase().search(city.toLowerCase()) !== -1) &&
        indicator
      );
    });

    const expectedResult = [["test1", 1], ["test2", 2]];
    expect(wrapper.instance().sumEachIndicator()).toEqual(expectedResult);
    expect(wrapper.instance().sumEachIndicator()[0][1]).toEqual(1);
  });

  it("sumAllIndiacators method", () => {
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
        city: "Jelenia Góra 58-500",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test1",
        street: "Unnamed Road",
        userId: 1
      },
      {
        city: "Wrocław",
        country: "Polska",
        icon: "123123213.png",
        id: 4,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();

    wrapper = shallow(
      <Statistic
        markers={markers}
        indicators={indicators}
        fetchMarkers={fetchMarkers}
        fetchIndicators={fetchIndicators}
      />
    );
    const expectedResult = [["All markers", 2]];
    expect(wrapper.instance().sumAllIndiacators()).toEqual(expectedResult);
  });

  it("render Graphs depends on indicators length - should return Graphs", () => {
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

    const indicators = [];
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();

    wrapper = shallow(
      <Statistic
        markers={markers}
        indicators={indicators}
        fetchMarkers={fetchMarkers}
        fetchIndicators={fetchIndicators}
      />
    );

    expect(
      wrapper
        .children()
        .at(1)
        .get(0).props.children.props.children
    ).toEqual("You have not any data to display on the charts");
  });
});
