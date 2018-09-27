import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import {connect} from 'react-redux';
import {postSelectedMarker} from '../../actions/postSelectedMarker';
import {fetchSelectedMarkers} from '../../actions/fetchSelectedMarkers';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';
import './map.css';

const {compose, withProps, withStateHandlers} = require("recompose");

const MapWithAMakredInfoWindow = compose(withStateHandlers(() => ({isOpen: false, id: null}), {
  onToggleOpen: ({isOpen, id}) => (id) => (id !== undefined && isOpen === false)
    ? ({
      isOpen: !isOpen,
      id: id
    })
    : ({id: id}),
}), withScriptjs, withGoogleMap)(props => {
  console.log(props);
  return <GoogleMap onClick={props.addMarker} defaultZoom={12} defaultCenter={{
      lat: 50.89973,
      lng: 15.72899
    }}>
    {
      props.markers.map((marker, index) => <Marker onClick={() => props.onToggleOpen(marker.id)} key={index} position={{
          lat: marker.lat,
          lng: marker.lng
        }} icon={{
          url: `http://localhost:8080/images/${marker.icon}`
        }}>
        {
          props.isOpen && props.id === marker.id && <InfoWindow className="infoWindow" onCloseClick={props.onToggleOpen}>
              <div className="infoWindow">sss</div>
            </InfoWindow>
        }
      </Marker>)
    }
  </GoogleMap>
});


class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      position: null
    };

    this.checkLocalization = this.checkLocalization.bind(this);
  }

  componentDidMount() {
    this.props.fetchSelectedMarkers();
  }

  checkLocalization(event) {
    console.log(event.latLng.lat(), event.latLng.lng());
    const selectedMarker = this.props.selectedMarker;
    const postSelectedMarker = this.props.postSelectedMarker;

    if (selectedMarker !== null) {
      const marker = {
        name: selectedMarker.name,
        icon: selectedMarker.icon,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      console.log(marker);
      postSelectedMarker(marker);
    }
  }

  render() {
    console.log(this.props.markers);
    const markers = this.props.markers;

    return (<MapWithAMakredInfoWindow
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=[API_KEY]&v=3.exp&libraries=geometry,drawing,places"
      markers={this.props.markers}
      addMarker={(e) => this.checkLocalization(e)}
      loadingElement={<div style = {{ height: `100%` }}/>}
      containerElement={<div style = {{ height: `100%` }}/>}
      mapElement={<div style = {{ height: `100%` }}/>}/>);
  }
}

const mapStateToProps = (state) => ({selectedMarker: state.selectedMarker.selectedMarker, markers: state.selectedMarker.selectedMarkers})

const mapDispatchToProps = {
  postSelectedMarker,
  fetchSelectedMarkers
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
//  onClick={() => this.onMarkerClick(marker.id)}
//onClick={props.onToggleOpen}
