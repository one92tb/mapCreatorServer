import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import {connect} from 'react-redux';
import {postSelectedMarker} from '../../actions/postSelectedMarker';
import {fetchSelectedMarkers} from '../../actions/fetchSelectedMarkers';

const { compose, withProps, withStateHandlers } = require("recompose");


class Map extends Component {

  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      position: null,
      currentId : 1,
    };

    this.checkLocalization = this.checkLocalization.bind(this);
  }

  componentDidMount() {
    this.props.fetchSelectedMarkers();
  }

  static defaultProps = {
    center: {
      lat: 50.89973,
      lng: 15.72899
    },
    zoom: 12
  };

  checkLocalization(event){
    console.log(event.latLng.lat(), event.latLng.lng());
    const selectedMarker = this.props.selectedMarker;
    const postSelectedMarker = this.props.postSelectedMarker;

    if(selectedMarker !== null){
      const marker = {
        name: selectedMarker.name,
        icon: selectedMarker.icon,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      console.log(marker);
      postSelectedMarker(marker);
    }

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onMarkerClick(id){
    this.setState({
      currentId: id
    })
  }


  render() {
    const markers = this.props.markers;


    const MapWithAMakredInfoWindow = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    onClick={this.checkLocalization}
    defaultZoom={12}
    defaultCenter={{
      lat: 50.89973,
      lng: 15.72899
     }}
  >
  {markers.map((marker, index)=>
    <Marker
      key={index}
      position ={{
        lat : marker.lat,
        lng : marker.lng
      }}
      icon = {{
         url: `http://localhost:8080/images/${marker.icon}`
       }}
       onClick={props.onToggleOpen}
    //  onClick={() => this.onMarkerClick(marker.id)}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
      <h1>sss</h1>
      </InfoWindow>}
    </Marker>
  )}
  </GoogleMap>
);



      return (

<MapWithAMakredInfoWindow
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2ZQRnC-OFhTQ7YE9noKjho5rDkI6rYUQ&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `100%` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
    );
  }
}

const mapStateToProps = (state) =>  ({
    selectedMarker: state.selectedMarker.selectedMarker,
    markers: state.selectedMarker.selectedMarkers
})

const mapDispatchToProps = {
  postSelectedMarker,
  fetchSelectedMarkers
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
