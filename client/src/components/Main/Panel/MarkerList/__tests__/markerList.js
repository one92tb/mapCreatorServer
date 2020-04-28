import '@testing-library/jest-dom'
import "@testing-library/react"
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {MarkerList} from "../MarkerList";
import "jest-styled-components";

test("it should render 3 markers into the Panel", () => {
  const fetchMarkers = jest.fn();
  const getSelectedMarker = jest.fn();
  const disableMarkers = jest.fn();
  const seectedMarker = "";
  const markers = [
    {
      id: 1,
      name: "square",
      icon: "square.png",
      userId: 1
    }, {
      id: 2,
      name: "park",
      icon: "park.png",
      userId: 1
    }, {
      id: 3,
      name: "restaurant",
      icon: "restaurant.png",
      userId: 1
    }
  ];

  const {getByAllTestId, getByTestId, getByText, debug, queryByText} = render(<MarkerList isNavSelect={false} fetchMarkers={fetchMarkers} getSelectedMarker={getSelectedMarker} disableMarkers={disableMarkers} selectedMarker={seectedMarker} markers={markers}/>)

  const markersInPanel = screen.queryAllByTestId("marker");
  //screen.debug(markersInPanel);
  expect(markersInPanel).toHaveLength(3);
})

test("it should select marker when Panel has select navigation", () => {
  const fetchMarkers = jest.fn();
  const getSelectedMarker = jest.fn();
  const disableMarkers = jest.fn();
  const seectedMarker = "";
  const isNavSelect = true;
  const markers = [
    {
      id: 1,
      name: "square",
      icon: "square.png",
      userId: 1
    }, {
      id: 2,
      name: "park",
      icon: "park.png",
      userId: 1
    }, {
      id: 3,
      name: "restaurant",
      icon: "restaurant.png",
      userId: 1
    }
  ];
  const currentLocation = {
    pathname: "/"
  }

  const {getByAllTestId, getByTestId, getByText, debug, queryByText} = render(<MarkerList currentLocation={currentLocation} isNavSelect={isNavSelect} fetchMarkers={fetchMarkers} getSelectedMarker={getSelectedMarker} disableMarkers={disableMarkers} selectedMarker={seectedMarker} markers={markers}/>)

  const allMarkers = screen.queryAllByTestId("marker");

  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#00b8e6");
})

test("it should unselect first marker and select second when Panel has select navigation", () => {
  const fetchMarkers = jest.fn();
  const getSelectedMarker = jest.fn();
  const disableMarkers = jest.fn();
  const seectedMarker = "";
  const isNavSelect = true;
  const markers = [
    {
      id: 1,
      name: "square",
      icon: "square.png",
      userId: 1
    }, {
      id: 2,
      name: "park",
      icon: "park.png",
      userId: 1
    }, {
      id: 3,
      name: "restaurant",
      icon: "restaurant.png",
      userId: 1
    }
  ];
  const currentLocation = {
    pathname: "/"
  }

  const {getByAllTestId, getByTestId, getByText, debug, queryByText} = render(<MarkerList currentLocation={currentLocation} isNavSelect={isNavSelect} fetchMarkers={fetchMarkers} getSelectedMarker={getSelectedMarker} disableMarkers={disableMarkers} selectedMarker={seectedMarker} markers={markers}/>)

  const allMarkers = screen.queryAllByTestId("marker");

  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#00b8e6");
  fireEvent.click(allMarkers[1]);
  expect(allMarkers[0]).toHaveStyleRule("background", "transparent");
  expect(allMarkers[1]).toHaveStyleRule("background", "#00b8e6");
})

test("it should select marker then unselect it when Panel has select navigation", () => {
  const fetchMarkers = jest.fn();
  const getSelectedMarker = jest.fn();
  const disableMarkers = jest.fn();
  const seectedMarker = "";
  const isNavSelect = true;
  const markers = [
    {
      id: 1,
      name: "square",
      icon: "square.png",
      userId: 1
    }, {
      id: 2,
      name: "park",
      icon: "park.png",
      userId: 1
    }, {
      id: 3,
      name: "restaurant",
      icon: "restaurant.png",
      userId: 1
    }
  ];
  const currentLocation = {
    pathname: "/"
  }

  const {getByAllTestId, getByTestId, getByText, debug, queryByText} = render(<MarkerList currentLocation={currentLocation} isNavSelect={isNavSelect} fetchMarkers={fetchMarkers} getSelectedMarker={getSelectedMarker} disableMarkers={disableMarkers} selectedMarker={seectedMarker} markers={markers}/>)

  const allMarkers = screen.queryAllByTestId("marker");

  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#00b8e6");
  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "transparent");
})

test("it should select first marker when Panel has filter navigation", () => {
  const fetchMarkers = jest.fn();
  const getSelectedMarker = jest.fn();
  const disableMarkers = jest.fn();
  const seectedMarker = "";
  const isNavSelect = false;
  const markers = [
    {
      id: 1,
      name: "square",
      icon: "square.png",
      userId: 1
    }, {
      id: 2,
      name: "park",
      icon: "park.png",
      userId: 1
    }, {
      id: 3,
      name: "restaurant",
      icon: "restaurant.png",
      userId: 1
    }
  ];
  const currentLocation = {
    pathname: "/"
  }

  const {getByAllTestId, getByTestId, getByText, debug, queryByText} = render(<MarkerList currentLocation={currentLocation} isNavSelect={isNavSelect} fetchMarkers={fetchMarkers} getSelectedMarker={getSelectedMarker} disableMarkers={disableMarkers} selectedMarker={seectedMarker} markers={markers}/>)

  const allMarkers = screen.queryAllByTestId("marker");

  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#999");
  expect(allMarkers[0]).toHaveStyleRule("opacity", "0.7");
})

test("it should select all markers when Panel has filter navigation", () => {
  const fetchMarkers = jest.fn();
  const getSelectedMarker = jest.fn();
  const disableMarkers = jest.fn();
  const seectedMarker = "";
  const isNavSelect = false;
  const markers = [
    {
      id: 1,
      name: "square",
      icon: "square.png",
      userId: 1
    }, {
      id: 2,
      name: "park",
      icon: "park.png",
      userId: 1
    }, {
      id: 3,
      name: "restaurant",
      icon: "restaurant.png",
      userId: 1
    }
  ];
  const currentLocation = {
    pathname: "/"
  }

  const {getByAllTestId, getByTestId, getByText, debug, queryByText} = render(<MarkerList currentLocation={currentLocation} isNavSelect={isNavSelect} fetchMarkers={fetchMarkers} getSelectedMarker={getSelectedMarker} disableMarkers={disableMarkers} selectedMarker={seectedMarker} markers={markers}/>)

  const allMarkers = screen.queryAllByTestId("marker");

  fireEvent.click(allMarkers[0]);
  fireEvent.click(allMarkers[1]);
  fireEvent.click(allMarkers[2]);

  expect(allMarkers[0]).toHaveStyleRule("background", "#999");
  expect(allMarkers[0]).toHaveStyleRule("opacity", "0.7");
  expect(allMarkers[1]).toHaveStyleRule("background", "#999");
  expect(allMarkers[1]).toHaveStyleRule("opacity", "0.7");
  expect(allMarkers[2]).toHaveStyleRule("background", "#999");
  expect(allMarkers[2]).toHaveStyleRule("opacity", "0.7");
})

test("it should select marker then unselect it when Panel has filter navigation", () => {
  const fetchMarkers = jest.fn();
  const getSelectedMarker = jest.fn();
  const disableMarkers = jest.fn();
  const seectedMarker = "";
  const isNavSelect = false;
  const markers = [
    {
      id: 1,
      name: "square",
      icon: "square.png",
      userId: 1
    }, {
      id: 2,
      name: "park",
      icon: "park.png",
      userId: 1
    }, {
      id: 3,
      name: "restaurant",
      icon: "restaurant.png",
      userId: 1
    }
  ];
  const currentLocation = {
    pathname: "/"
  }

  const {getByAllTestId, getByTestId, getByText, debug, queryByText} = render(<MarkerList currentLocation={currentLocation} isNavSelect={isNavSelect} fetchMarkers={fetchMarkers} getSelectedMarker={getSelectedMarker} disableMarkers={disableMarkers} selectedMarker={seectedMarker} markers={markers}/>)

  const allMarkers = screen.queryAllByTestId("marker");


  fireEvent.click(allMarkers[0]);
  expect(allMarkers[0]).toHaveStyleRule("background", "#999");
  expect(allMarkers[0]).toHaveStyleRule("opacity", "0.7");
    fireEvent.click(allMarkers[0]);
  expect(allMarkers[1]).toHaveStyleRule("background", "transparent");
  expect(allMarkers[1]).toHaveStyleRule("opacity", "1");

})
