import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { List } from "./List";

describe("list component", () => {
  let wrapper;

  it("passses all props to List component", () => {
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
    const redirectToMain = jest.fn();
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("tbody with 2 indicators", () => {
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
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );
    expect(wrapper.find("tbody").children().length).toEqual(2);
  });

  it("tbody without indicators", () => {
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
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );
    expect(wrapper.find("tbody").children().length).toEqual(0);
  });

  it("default settings - should return all table body row", () => {
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
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const city = "";
    const markerName = "All";

    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );

    const filteredTr = wrapper
      .find("tbody")
      .children() //[tr,tr]
      .filterWhere(tr => {
        if (markerName === "All" && !city) {
          return tr;
        }
      });
    expect(filteredTr.length).toEqual(2);
  });

  it("filtered table body row by city", () => {
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
        city: "Wrocław",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const city = "jelen";
    const markerName = "All";

    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );

    const filteredTr = wrapper
      .find("tbody")
      .children() //[tr,tr]
      .filterWhere(tr => {
        if (
          markerName === "All" &&
          tr
            .childAt(3)
            .children()
            .text()
            .toLowerCase()
            .search(city.toLowerCase()) !== -1
        ) {
          return tr;
        }
      });
    expect(filteredTr.length).toEqual(1);
  });

  it("filtered table body row by markerName and city", () => {
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
        city: "Wrocław",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const city = "Wrocław";
    const markerName = "test2";

    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );

    const filteredTr = wrapper
      .find("tbody")
      .children() //[tr,tr]
      .filterWhere(tr => {
        if (
          markerName ===
            tr
              .childAt(1)
              .children()
              .text() &&
          tr
            .childAt(3)
            .children()
            .text()
            .toLowerCase()
            .search(city.toLowerCase()) !== -1
        ) {
          return tr;
        }
      });
    expect(filteredTr.length).toEqual(1);
  });

  it("change marker name in state", () => {
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
        city: "Wrocław",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );

    const select = wrapper.find("select");
    select.simulate("change", {
      target: {
        name: "markerName",
        value: "test1"
      }
    });
    expect(wrapper.state().markerName).toEqual("test1");
  });

  it("change city in state", () => {
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
        city: "Wrocław",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );

    const input = wrapper.find("input");
    input.simulate("change", {
      target: {
        name: "city",
        value: "Jelenia Góra"
      }
    });

    expect(input.props().name).toEqual("city");
    expect(wrapper.state().city).toEqual("Jelenia Góra");
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
        city: "Wrocław",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];
    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );

    expect(fetchIndicators).toHaveBeenCalledTimes(1);
    expect(fetchMarkers).toHaveBeenCalledTimes(1);
  });
  it("findIndicatorOnTheMap method have been called 1 time", () => {
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
        city: "Wrocław",
        country: "Polska",
        icon: "1548784752159.png",
        id: 3,
        lat: 50.933387715648635,
        lng: 15.840054910888739,
        name: "test2",
        street: "Unnamed Road",
        userId: 1
      }
    ];

    const indicator = {
      city: "Jelenia Góra 58-500",
      country: "Polska",
      icon: "1548784752159.png",
      id: 2,
      lat: 50.92841093800815,
      lng: 15.640584390869208,
      name: "test1",
      street: "Unnamed Road",
      userId: 1
    };

    const fetchIndicators = jest.fn();
    const fetchMarkers = jest.fn();
    const redirectToMain = jest.fn();

    wrapper = shallow(
      <List
        markers={markers}
        indicators={indicators}
        fetchIndicators={fetchIndicators}
        fetchMarkers={fetchMarkers}
        redirectToMain={redirectToMain}
      />
    );

    const mapCell = wrapper
      .find("tr")
      .at(1)
      .children()
      .at(5)
      .childAt(0);

    mapCell.simulate("click");

    expect(redirectToMain).toHaveBeenCalledTimes(1);
  });
});
