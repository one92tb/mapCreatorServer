import '@testing-library/jest-dom/extend-expect';
import "@testing-library/react"
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {Map, MapWithAMakredInfoWindow} from "../Map";
import "jest-styled-components";
import apiKey from ".././apiKey";
import baseUrl from "../../../../baseUrl";

test("render map component", () => {
  const props = {
    fetchIndicators: jest.fn(),
    postIndicator: jest.fn(),
    removeIndicator: jest.fn(),
    indicators: [
      {
        id: 1,
        city: " 58-573 Piechowice",
        country: " Polska",
        icon: "1586788206088.png",
        lat: 50.87113971486665,
        lng: 15.596124094238299,
        name: "1231",
        street: "Bobrowa 6",
        userId: 1
      }, {
        city: " Jelenia Góra",
        country: " Polska",
        icon: "1586788206088.png",
        id: 2,
        lat: 50.91520907904416,
        lng: 15.690395694484728,
        name: "1231",
        street: "Jana III Sobieskiego",
        userId: 1
      }
    ],
    isNavSelect: false,
    selectedMarker: "",
    disableMarkers: [],
    selectedIndicator: ""
  }

  render(< Map {
    ...props
  } />)
})

test("render map component", () => {
  const props = {
    fetchIndicators: jest.fn(),
    postIndicator: jest.fn(),
    removeIndicator: jest.fn(),
    indicators: [
      {
        id: 1,
        city: " 58-573 Piechowice",
        country: " Polska",
        icon: "1586788206088.png",
        lat: 50.87113971486665,
        lng: 15.596124094238299,
        name: "1231",
        street: "Bobrowa 6",
        userId: 1
      }, {
        city: " Jelenia Góra",
        country: " Polska",
        icon: "1586788206088.png",
        id: 2,
        lat: 50.91520907904416,
        lng: 15.690395694484728,
        name: "1231",
        street: "Jana III Sobieskiego",
        userId: 1
      }
    ],
    isNavSelect: false,
    selectedMarker: "",
    disableMarkers: [],
    selectedIndicator: ""
  }

  render(< Map {
    ...props
  } />)
})

const removeBtn = screen.getAllByTestId("marker");
screen.degug(removeBtn);
