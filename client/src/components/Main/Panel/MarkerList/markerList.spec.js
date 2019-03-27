import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { MarkerList } from "./MarkerList";

describe("marker list component", () => {
  let wrapper;

  it("passess all props to markerList component", () => {
    const fetchMarkers = jest.fn();
    const getSelectedMarker = jest.fn();
    const disableMarkers = jest.fn();
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
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };

    const isNavSelect = true;

    wrapper = shallow(
      <MarkerList
        markers={markers}
        selectedMarker={selectedMarker}
        fetchMarkers={fetchMarkers}
        getSelectedMarker={getSelectedMarker}
        disableMarkers={disableMarkers}
        isNavSelect={isNavSelect}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("componentDidMount", () => {
    const fetchMarkers = jest.fn();
    const getSelectedMarker = jest.fn();
    const disableMarkers = jest.fn();
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
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };

    wrapper = shallow(
      <MarkerList
        markers={markers}
        selectedMarker={selectedMarker}
        fetchMarkers={fetchMarkers}
        getSelectedMarker={getSelectedMarker}
        disableMarkers={disableMarkers}
        isNavSelect={true}
      />
    );

    expect(fetchMarkers).toHaveBeenCalledTimes(1);
  });

  it("componentDidUpdate", () => {
    const fetchMarkers = jest.fn();
    const getSelectedMarker = jest.fn();
    const disableMarkers = jest.fn();
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

    wrapper = shallow(
      <MarkerList
        markers={markers}
        selectedMarker={""}
        fetchMarkers={fetchMarkers}
        getSelectedMarker={getSelectedMarker}
        disableMarkers={disableMarkers}
        isNavSelect={true}
      />
    );

    wrapper.setState({
      selectedId: 5
    });

    expect(wrapper.instance().state.selectedId).toBe("");
  });

  it("onSelect - select marker", () => {
    const fetchMarkers = jest.fn();
    const getSelectedMarker = jest.fn(selectedMarker => {
      wrapper.setProps({
        selectedMarker: selectedMarker
      });
    });
    const disableMarkers = jest.fn();
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

    const expectedSelectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };
    const isNavSelect = true;

    wrapper = mount(
      <MarkerList
        markers={markers}
        selectedMarker={""}
        fetchMarkers={fetchMarkers}
        getSelectedMarker={getSelectedMarker}
        disableMarkers={disableMarkers}
        isNavSelect={isNavSelect}
      />
    );

    const li = wrapper.find("li").first();
    li.simulate("click");

    expect(getSelectedMarker).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.selectedId).toBe(1);
    expect(wrapper.instance().props.selectedMarker).toEqual(
      expectedSelectedMarker
    );
    expect(isNavSelect).toBe(true);
  });

  it("onSelect - unselect marker", () => {
    const fetchMarkers = jest.fn();
    const getSelectedMarker = jest.fn(selectedMarker => {
      wrapper.setProps({
        selectedMarker: selectedMarker
      });
    });
    const disableMarkers = jest.fn();
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

    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };
    const isNavSelect = true;

    wrapper = mount(
      <MarkerList
        markers={markers}
        selectedMarker={selectedMarker}
        fetchMarkers={fetchMarkers}
        getSelectedMarker={getSelectedMarker}
        disableMarkers={disableMarkers}
        isNavSelect={isNavSelect}
      />
    );

    wrapper.setState({
      selectedId: 1
    });

    const expectedSelectedMarker = {
      id: undefined,
      name: "",
      url: "IMG-default.png"
    };

    const li = wrapper.find("li").first();
    li.simulate("click");

    expect(getSelectedMarker).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.selectedId).toBe("");
    expect(wrapper.instance().props.selectedMarker).toEqual(
      expectedSelectedMarker
    );
  });

  it("onSelect - add marker to filteredMarkers in state", () => {
    const fetchMarkers = jest.fn();
    const getSelectedMarker = jest.fn(selectedMarker => {
      wrapper.setProps({
        selectedMarker: selectedMarker
      });
    });
    const disableMarkers = jest.fn();
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

    const isNavSelect = false;

    wrapper = mount(
      <MarkerList
        markers={markers}
        selectedMarker={""}
        fetchMarkers={fetchMarkers}
        getSelectedMarker={getSelectedMarker}
        disableMarkers={disableMarkers}
        isNavSelect={isNavSelect}
      />
    );

    const li = wrapper.find("li").first();
    li.simulate("click");

    expect(disableMarkers).toHaveBeenCalledTimes(1);
    expect(wrapper.state().filteredMarkers).toEqual([markers[0]]);
  });
  it("onSelect - remove marker from filteredMarkers in state", () => {
    const fetchMarkers = jest.fn();
    const getSelectedMarker = jest.fn(selectedMarker => {
      wrapper.setProps({
        selectedMarker: selectedMarker
      });
    });
    const disableMarkers = jest.fn();
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

    const isNavSelect = false;

    wrapper = mount(
      <MarkerList
        markers={markers}
        selectedMarker={""}
        fetchMarkers={fetchMarkers}
        getSelectedMarker={getSelectedMarker}
        disableMarkers={disableMarkers}
        isNavSelect={isNavSelect}
      />
    );

    wrapper.setState({
      filteredMarkers: [markers[0]]
    });

    const li = wrapper.find("li").first();
    li.simulate("click");

    expect(disableMarkers).toHaveBeenCalledTimes(1);
    expect(wrapper.state().filteredMarkers).toEqual([]);
  });
});
