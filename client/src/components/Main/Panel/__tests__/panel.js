import '@testing-library/jest-dom'
import "@testing-library/react"
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {Panel} from '../Panel';
import {MarkerList} from '../MarkerList/MarkerList';
import "jest-styled-components";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../../../mocks/localStorageMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.localStorage = new LocalStorageMock();

const store = mockStore({
  marker: {
    selectedMarker: "",
    markers: []
  }
});

test("it should render Panel Component", () => {

  const props={
    isPanelSelect: jest.fn(),
    location: {
      pathname: "/"
    }
  }

  render(<Provider store={store}>
    <Panel {...props}/>
  </Provider>)
});

test("it should successfully change Panel From Select to Filter", () => {

  const props={
    isPanelSelect: jest.fn(),
    location: {
      pathname: "/"
    }
  }

  render(<Provider store={store}>
    <Panel {...props}/>
  </Provider>)

  const SelectLink = screen.getByText("Select marker");
  const FilterLink = screen.getByText("Filter marker");
  fireEvent.click(FilterLink);
  expect(SelectLink).toHaveStyleRule("font-weight", "normal");
  expect(FilterLink).toHaveStyleRule("font-weight", "bold");
});

test("it should always set in the Panel Select when create marker option is selected", () => {
  const props={
    isPanelSelect: jest.fn(),
    location: {
      pathname: "/createMarker"
    }
  }
render(<Provider store={store}>
    <Panel {...props}/>
  </Provider>)

  const SelectLink = screen.getByText("Select marker");
  const FilterLink = screen.getByText("Filter marker");

  fireEvent.click(FilterLink);
  expect(SelectLink).toHaveStyleRule("font-weight", "bold");
  expect(FilterLink).toHaveStyleRule("font-weight", "normal");
});
