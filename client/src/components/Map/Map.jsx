import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { connect } from "react-redux";
import { postSelectedMarker } from "../../actions/postSelectedMarker";
import { fetchSelectedMarkers } from "../../actions/fetchSelectedMarkers";
import { removeSelectedMarker } from "../../actions/removeSelectedMarker";
import apiKey from './apiKey'
import "./map.css";

const { compose, withProps, withStateHandlers } = require("recompose");

const onToggleOpen = ({ isOpen, id }) => id =>
  id && !isOpen
    ? {
        isOpen: !isOpen,
        id
      }
    : { id };

//stan,
const MapWithAMakredInfoWindow = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
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
      id: null
    }),
    { onToggleOpen }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  console.log(props); /// default props zoom
  return (
    <GoogleMap
      ref={props.onMapMounted}
      zoom={props.zoom}
      onZoomChanged={props.onZoomChanged}
      onClick={props.addMarker}
      defaultCenter={{
        lat: 50.89973,
        lng: 15.72899
      }}
    >
      {props.markers.map((marker, index) => (
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
              <InfoWindow
                className="infoWindow"
                ref={props.onInfoMounted}
                onCloseClick={props.onToggleOpen}
              >
                <div className="infoWindow">
                  <span className="markerName">name: {marker.name}</span>
                  <button
                    className="infoBtn"
                    onClick={() => props.removeMarker(marker.id)}
                  >
                    Remove Marker
                  </button>
                </div>
              </InfoWindow>
            )}
        </Marker>
      ))}
    </GoogleMap>
  );
});

class Map extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      position: null,
      zoom: 12,
      mapRef: ""
    };
  }

  componentDidMount() {
    this.props.fetchSelectedMarkers();
  }

  addMarker = event => {
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
      console.log(marker);
      postSelectedMarker(marker);
    }
  };

  removeMarker = id => {
    console.log(id);
    this.props.removeSelectedMarker(id);
  };

  onMapMounted = mapRef => {
    this.setState({ mapRef: mapRef });
  };

  onZoomChanged = () => {
    this.setState({
      zoom: this.state.mapRef.context
        .__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.zoom
    });
  };

  render() {
    console.log(this.props, this.state);
    return (
      <MapWithAMakredInfoWindow
        onZoomChanged={this.onZoomChanged}
        zoom={this.state.zoom}
        onMapMounted={this.onMapMounted}
        markers={this.props.markers}
        addMarker={e => this.addMarker(e)}
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
//  onClick={() => this.onMarkerClick(marker.id)}
//onClick={props.onToggleOpen}
