import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <div><i className="icon-home"></i></div>;

class Map extends Component {

  constructor(props){
    super(props);
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

  render() {
    console.log(this.props);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact onClick={this.check}
          bootstrapURLKeys={{ key: 'AIzaSyC9KF6ohkrQU2JPS8wiBWLmlcUqbAf0ik8' }}
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

export default Map;
