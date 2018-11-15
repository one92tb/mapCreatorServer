/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { postSelectedMarker } from "../../../actions/postSelectedMarker";
import { fetchSelectedMarkers } from "../../../actions/fetchSelectedMarkers";
import { removeSelectedMarker } from "../../../actions/removeSelectedMarker";
import apiKey from "./apiKey";
import styled from "styled-components";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const {
  compose,
  withProps,
  withStateHandlers,
  lifecycle
} = require("recompose");
const _ = require("lodash");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px 20px 40px 10px;
  background: #f2f2f2;
`;

const SearchBoxInput = styled.input`
  box-sizing: border-box;
  border: 1px solid transparent;
  width: 240px;
  height: 40px;
  margin-top: 10px;
  padding: 0 12px;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  outline: none;
`;

const InfoBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: #4ddbff;
  opacity: 0.9;
  height: 200px;
  width: 250px;
  border: 5px solid #00b8e6;
  border-radius: 5px;

  &:before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 31, 150, 0);
    border-top-color: #00b8e6;
    border-width: 25px;
    margin-left: -25px;
  }
  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #00b8e6;
    border-width: 20px;
    margin-left: -20px;
  }
`;

const InfoBtn = styled.button`
  margin-top: 10px;
  width: 160px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background: #4ddbff;
  color: #003d4d;
  border: 0;
  padding: 5px;
  border-radius: 2px;
  border: 2px solid #00b8e6;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #ff1a1a;
  }
`;

const InfoContent = styled.span`
  font-size: 15px;
  color: #003d4d;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border-bottom: 2px solid #00b8e6;
  font-weight: bold;
`;

const onToggleOpen = ({ isOpen, id }) => id =>
  id && !isOpen
    ? {
        isOpen: !isOpen,
        id
      }
    : { id };

const geocode = (marker, postSelectedMarker) => {
  let geocoder = new window.google.maps.Geocoder();
  geocoder.geocode(
    {
      location: {
        lat: marker.lat,
        lng: marker.lng
      }
    },
    (results, status) => {
      console.log(results);
      if (status === "OK") {
        const markerToPost = {
          name: marker.name,
          lat: marker.lat,
          lng: marker.lng,
          icon: marker.icon,
          street: results[0].formatted_address.split(",")[0],
          city: results[0].formatted_address.split(",")[1],
          country: results[0].formatted_address.split(",")[2]
        };

        postSelectedMarker(markerToPost);
      } else if (status === "OVER_QUERY_LIMIT") {
        console.log(
          "Geocode was not successful for the following reason: " + status
        );
      } else {
        console.log(
          "Geocode was not successful for the following reason: " + status
        );
      }
    }
  );
};

const MapWithAMakredInfoWindow = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
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
    )
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
      id: null,
      bounds: null,
      center: {
        lat: 50.89973,
        lng: 15.72899
      },
      zoom: 12
    }),
    { onToggleOpen, geocode }
  ),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const refs = {};

      this.setState({
        onMapMounted: ref => {
          console.log(ref);
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onMouseOver: () => {},
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          console.log(places, bounds);

          places.forEach(
            place =>
              place.geometry.viewport
                ? bounds.union(place.geometry.viewport)
                : bounds.extend(place.geometry.location)
          );

          const nextCenter = _.get(this.state.center);

          this.setState({
            center: nextCenter
          });

          refs.map.fitBounds(bounds);
        },
        onZoomChanged: () => {
          this.setState({
            zoom:
              refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.zoom
          });
        }
      });
    }
  })
)(props => {
  return (
    <GoogleMap
      ref={props.onMapMounted}
      onBoundsChanged={props.onBoundsChanged}
      onMouseOver={props.onMouseOver}
      defaultZoom={props.zoom}
      onZoomChanged={props.onZoomChanged}
      onClick={e => props.addMarker(e, geocode, postSelectedMarker)}
      defaultCenter={props.center}
      defaultCursor={props.cursor}
    >
      {props.markers
        .filter(
          marker =>
            !props.disableMarkers.find(
              disableItem => disableItem.name === marker.name
            )
        )
        .map((marker, index) => {
          return (
            <Marker
              onClick={() => props.onToggleOpen(marker.id)}
              key={index}
              position={{
                lat: marker.lat,
                lng: marker.lng
              }}
              icon={{
                url: `http://localhost:8080/images/${marker.icon}`,
                scaledSize: {
                  width: props.zoom < 14 ? 16 : 50,
                  height: props.zoom < 14 ? 16 : 50
                }
              }}
              visible={!(props.zoom < 11)}
            >
              {props.isOpen &&
                props.id === marker.id && (
                  <InfoBox
                    defaultPosition={{
                      lat: marker.lat,
                      lng: marker.lng
                    }}
                    ref={props.onInfoBox}
                    onCloseClick={props.onToggleOpen}
                    closeBoxURL=""
                    options={{
                      boxStyle: {
                        border: "none",
                        fontSize: "12pt",
                        overflow: "hidden",
                        height: "250px",
                        width: "250px",
                        display: props.zoom < 11 ? "none" : "block"
                      },
                      closeBoxMargin: "5px 5px 2px 2px",
                      alignBottom: true,
                      isHidden: false,
                      pixelOffset:
                        props.zoom < 14
                          ? new google.maps.Size(-125, -20)
                          : new google.maps.Size(-125, -45),
                      enableEventPropagation: true,
                      infoBoxClearance: new google.maps.Size(1, 1)
                    }}
                  >
                    <InfoBoxContainer>
                      <InfoContent>{marker.name}</InfoContent>
                      <InfoContent>{marker.street}</InfoContent>
                      <InfoContent>{marker.city}</InfoContent>
                      <InfoContent>{marker.country}</InfoContent>
                      <InfoBtn onClick={() => props.removeMarker(marker.id)}>
                        Remove Marker
                      </InfoBtn>
                    </InfoBoxContainer>
                  </InfoBox>
                )}
            </Marker>
          );
        })}

      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <SearchBoxInput type="text" placeholder="Customized your placeholder" />
      </SearchBox>
    </GoogleMap>
  );
});

class Map extends Component {
  componentDidMount() {
    this.props.fetchSelectedMarkers();
  }

  addMarker = (event, geocode) => {
    console.log(this.props);
    const selectedMarker = this.props.selectedMarker;
    const postSelectedMarker = this.props.postSelectedMarker;
    const isNavSelect = this.props.isNavSelect;

    if (selectedMarker.id && !selectedMarker.isDeleted && isNavSelect) {
      console.log(this.props.isNavSelect);
      const marker = {
        name: selectedMarker.name,
        icon: selectedMarker.icon,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      geocode(marker, postSelectedMarker);
    }
  };

  removeMarker = id => {
    this.props.removeSelectedMarker(id);
  };

  render() {
    console.log(this.props, this.state);
    return (
      <Wrapper>
        <MapWithAMakredInfoWindow
          markers={this.props.markers}
          selectedMarker={this.props.selectedMarker}
          addMarker={this.addMarker}
          removeMarker={this.removeMarker}
          disableMarkers={this.props.disableMarkers}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  selectedMarker: state.selectedMarker.selectedMarker,
  markers: state.selectedMarker.selectedMarkers,
  isNavSelect: state.selectedMarker.isNavSelect,
  disableMarkers: state.selectedMarker.disableMarkers
});

const mapDispatchToProps = {
  postSelectedMarker,
  fetchSelectedMarkers,
  removeSelectedMarker
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
