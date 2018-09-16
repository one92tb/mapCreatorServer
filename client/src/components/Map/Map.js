import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {connect} from 'react-redux';
import {postSelectedMarker} from '../../actions/postSelectedMarker';

const AnyReactComponent = () => <div><i className="icon-home"></i></div>;

class Map extends Component {

  constructor(props){
    super(props);

    this.checkLocalization = this.checkLocalization.bind(this);
  }

  componentDidMount() {
    fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyC9KF6ohkrQU2JPS8wiBWLmlcUqbAf0ik8&callback=initMap')
    .then(data => console.log(data)) // JSON from `response.json()` call
    .catch(error => console.error(error));
  }

  static defaultProps = {
    center: {
      lat: 50.89973,
      lng: 15.72899
    },
    zoom: 12
  };

  checkLocalization(event){
    const selectedMarker = this.props.selectedMarker;
    const postSelectedMarker = this.props.postSelectedMarker;

    if(selectedMarker !== null){
      const marker = {
        name: selectedMarker.name,
        icon: selectedMarker.icon,
        lat: event.lat,
        lng: event.lng
      }
      console.log(marker)
      postSelectedMarker(marker);
    }
  }

  render() {
    console.log(this.props);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact onClick={this.checkLocalization}
          bootstrapURLKeys={{ key: 'AIzaSyCFD4s2zRMFuSEiH9O3zWW19s-556oiMxg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={50.89973}
            lng={15.72899}
          />
        </GoogleMapReact>
      </div>
    );
  }

}

const mapStateToProps = (state) =>  ({
    selectedMarker: state.selectedMarker.selectedMarker
})

const mapDispatchToProps = {
  postSelectedMarker
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
