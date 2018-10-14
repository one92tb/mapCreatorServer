/*global google*/
import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { postSelectedMarker } from "../../actions/postSelectedMarker";
import { fetchSelectedMarkers } from "../../actions/fetchSelectedMarkers";
import { removeSelectedMarker } from "../../actions/removeSelectedMarker";
import apiKey from "./apiKey";
import "./map.css";
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
      } else if (status == "OVER_QUERY_LIMIT") {
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
  console.log(props);
  return (
    <GoogleMap
      ref={props.onMapMounted}
      onBoundsChanged={props.onBoundsChanged}
      defaultZoom={props.zoom}
      onZoomChanged={props.onZoomChanged}
      onClick={e => props.addMarker(e, geocode, postSelectedMarker)}
      defaultCenter={props.center}
    >
      {props.markers.map((marker, index) => {
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
                width: props.zoom < 14 ? 16 : 32,
                height: props.zoom < 14 ? 16 : 32
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
                        : new google.maps.Size(-125, -35),
                    enableEventPropagation: true,
                    infoBoxClearance: new google.maps.Size(1, 1)
                  }}
                >
                  <div className="infoBoxContainer">
                    <span className="markerName">{marker.name}</span>
                    <span className="markerStreet">{marker.street}</span>
                    <span className="markerStreet">{marker.city}</span>
                    <span className="markerStreet">{marker.country}</span>
                    <button
                      className="infoBtn"
                      onClick={() => props.removeMarker(marker.id)}
                    >
                      Remove Marker
                    </button>
                  </div>
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
        <input
          type="text"
          placeholder="Customized your placeholder"
          className="searchBox"
        />
      </SearchBox>
    </GoogleMap>
  );
});

class Map extends Component {
  componentDidMount() {
    this.props.fetchSelectedMarkers();
  }

  addMarker = (event, geocode) => {
    const selectedMarker = this.props.selectedMarker;
    const postSelectedMarker = this.props.postSelectedMarker;

    if (this.props.selectedMarker.id && !this.props.selectedMarker.isDeleted) {
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
      <MapWithAMakredInfoWindow
        markers={this.props.markers}
        selectedMarker={this.props.selectedMarker}
        addMarker={this.addMarker}
        removeMarker={this.removeMarker}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedMarker: state.selectedMarker.selectedMarker,
  markers: state.selectedMarker.selectedMarkers
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
