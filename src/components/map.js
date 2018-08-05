import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyA7P_AWI7wDBqw4PSJDYCmI22HSi8vi2qQ&callback=initMap')
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
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }

}

export default Map;
