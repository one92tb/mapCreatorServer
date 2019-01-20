import React, { Component } from "react";
import { fetchMarkers } from "../../../../actions/marker/fetchMarkers";
import { disableMarkers } from "../../../../actions/marker/disableMarkers";
import { getSelectedMarker } from "../../../../actions/marker/getSelectedMarker";
import { connect } from "react-redux";
import { List, Marker, MarkerIcon, MarkerName, MarkerImg } from "./style";
import PropTypes from "prop-types";

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: "",
      filteredMarkers: []
    };
  }

  componentDidMount() {
    const { fetchMarkers } = this.props;
    fetchMarkers();
  }

  componentDidUpdate() {
    const { selectedId } = this.state;
    const { selectedMarker } = this.props;
    if (selectedId !== selectedMarker && selectedMarker === "") {
      this.setState({
        selectedId: ""
      });
    }
  }

  onSelect = (marker, id) => {
    const { getSelectedMarker, isNavSelect, disableMarkers } = this.props;
    const { selectedId, filteredMarkers } = this.state;

    if (marker.id !== selectedId && isNavSelect) {
      this.setState({ selectedId: id });
      getSelectedMarker({
        ...marker,
        url: `http://localhost:8080/images/${marker.icon}`
      });
    } else if (marker.id === selectedId && isNavSelect) {
      id = "";
      this.setState({ selectedId: id });
      getSelectedMarker({
        id: undefined,
        name: "",
        url: "IMG-default.png"
      });
    } else {
      //delete Marker from filteredMarkers if exist
      if (filteredMarkers.find(el => el.id === marker.id)) {
        this.setState(
          {
            filteredMarkers: filteredMarkers.filter(el => el.id !== marker.id)
          },
          () => {
            disableMarkers(this.state.filteredMarkers);
          }
        );
        //add Marker to filteredMarkers if not exist
      } else {
        this.setState(
          {
            filteredMarkers: [...filteredMarkers, marker]
          },
          () => {
            disableMarkers(this.state.filteredMarkers);
          }
        );
      }
    }
  };

  render() {
    const { isNavSelect, markers } = this.props;
    const { selectedId, filteredMarkers } = this.state;
    return (
      <List>
        {markers.map((marker, id) => (
          <Marker
            key={marker.id}
            isSelected={selectedId === marker.id && isNavSelect}
            isFiltered={
              filteredMarkers.find(el => el.id === marker.id) && !isNavSelect
            }
            onClick={() => this.onSelect(marker, marker.id)}
          >
            <MarkerIcon>
              <MarkerImg
                src={`http://localhost:8080/images/${marker.icon}`}
                alt={marker.icon}
              />
            </MarkerIcon>
            <MarkerName>{marker.name}</MarkerName>
          </Marker>
        ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  selectedMarker: state.marker.selectedMarker,
  markers: state.marker.markers
});

const mapDispatchToProps = {
  fetchMarkers,
  getSelectedMarker,
  disableMarkers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerList);

MarkerList.propTypes = {
  fetchMarkers: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired,
  disableMarkers: PropTypes.func.isRequired,
  isNavSelect: PropTypes.bool.isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired
    })
  )
};

MarkerList.defaultProps = {};
