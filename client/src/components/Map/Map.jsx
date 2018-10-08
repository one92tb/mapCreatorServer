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
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");

const onToggleOpen = ({ isOpen, id }) => id =>
  id && !isOpen
    ? {
        isOpen: !isOpen,
        id
      }
    : { id };

const geocode = (marker, postSelectedMarker) => {
  console.log(postSelectedMarker);
  console.log(this);
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
      streets: []
    }),
    { onToggleOpen, geocode }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  console.log(props); 
  return (
    <GoogleMap
      ref={props.onMapMounted}
      zoom={props.zoom}
      onZoomChanged={props.onZoomChanged}
      onClick={e => props.addMarker(e, geocode, postSelectedMarker)}
      defaultCenter={{
        lat: 50.89973,
        lng: 15.72899
      }}
    >
      {props.markers.map((marker, index) => {
        console.log(marker);
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
            visible={!(props.zoom <= 11)}
          >
            {props.isOpen &&
              props.id === marker.id && (
                <InfoBox
                  defaultPosition={{
                    lat: marker.lat,
                    lng: marker.lng
                  }}
                  ref={props.onInfoWindowMounted}
                  onCloseClick={props.onToggleOpen}
                  closeBoxURL=""
                  visible={!(props.zoom < 11)}
                  options={{
                    boxStyle: {
                      border: "none",
                      fontSize: "12pt",
                      overflow: "hidden",
                      height: "250px",
                      width: "200px"
                    },
                    closeBoxMargin: "5px 5px 2px 2px",
                    alignBottom: true,
                    isHidden: false,
                    pixelOffset:
                      props.zoom < 14
                        ? new google.maps.Size(-100, -20)
                        : new google.maps.Size(-100, -35),
                    enableEventPropagation: true,
                    infoBoxClearance: new google.maps.Size(1, 1)
                  }}
                >
                  <div className="infoBoxContainer">
                    <span className="markerName">{marker.name}</span>
                    <span className="markerStreet">{marker.street}</span>
                    <span className="markerStreet">{marker.city}</span>
                    <span className="markerStreet">{marker.country}}</span>
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
    </GoogleMap>
  );
});

class Map extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      position: null,
      zoom: 12,
      mapRef: "",
      infoWindowRef: ""
    };
  }

  componentDidMount() {
    this.props.fetchSelectedMarkers();
  }

  addMarker = (event, geocode) => {
    console.log(event, event.latLng.lat(), event.latLng.lng());
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

  onMarkersStreets = street => {
    this.setState({ markersStreets: [...this.state.markersStreets, street] });
  };

  removeMarker = id => {
    this.props.removeSelectedMarker(id);
  };

  onMapMounted = mapRef => {
    this.setState({ mapRef: mapRef });
  };

  onInfoWindowMounted = infoRef => {
    this.setState({ infoWindowRef: infoRef });
  };

  onZoomChanged = () => {
    this.setState({
      zoom: this.state.mapRef.context
        .__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.zoom
    });
  };

  render() {
    return (
      <MapWithAMakredInfoWindow
        onZoomChanged={this.onZoomChanged}
        zoom={this.state.zoom}
        onMapMounted={this.onMapMounted}
        onInfoWindowMounted={this.onInfoWindowMounted}
        onMarkersStreets={this.onMarkersStreets}
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
  markers: state.selectedMarker.selectedMarkers,
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
