import React, { Component } from "react";
import { fetchRecords } from "../../../../actions/fetchRecords";
import { getSelectedMarker } from "../../../../actions/getSelectedMarker";
import { disableMarkers } from "../../../../actions/disableMarkers";
import { connect } from "react-redux";
import { List, Marker, MarkerIcon, MarkerName } from "./style";

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: "",
      filteredMarkers: []
    };
  }

  componentDidMount() {
    const { fetchRecords } = this.props;
    fetchRecords();
  }

  onSelect = (marker, id) => {
    console.log(marker);

    const { getSelectedMarker, isNavSelect, disableMarkers } = this.props;
    const { selectedId, filteredMarkers } = this.state;

    if (marker.id !== selectedId && isNavSelect) {
      // SELECT
      this.setState({ selectedId: id });
      getSelectedMarker({
        ...marker,
        url: `http://localhost:8080/images/${marker.icon}`
      });
    }
    //wyzerowanie selected
    else if (marker.id === selectedId && isNavSelect) {
      // UNSELECT
      id = "";
      this.setState({ selectedId: id });
      getSelectedMarker({
        id: undefined,
        name: "",
        url: "IMG-default.png"
      });
    } else {
      if (filteredMarkers.find(el => el.id === marker.id)) {
        // delete the same
        this.setState(
          {
            filteredMarkers: filteredMarkers.filter(el => el.id !== marker.id)
          },
          () => {
            return disableMarkers(filteredMarkers);
          }
        );
      } else {
        this.setState(
          {
            filteredMarkers: [...filteredMarkers, marker]
          },
          () => disableMarkers(filteredMarkers)
        );
      }
    }
  };

  render() {
    const { isNavSelect, records } = this.props;
    const { selectedId, filteredMarkers } = this.state;

    return (
      <List>
        {records.map((marker, id) => (
          <Marker
            key={marker.id}
            isSelected={selectedId === marker.id && isNavSelect}
            isFiltered={
              filteredMarkers.find(el => el.id === marker.id) && !isNavSelect
            }
            onClick={() => this.onSelect(marker, marker.id)}
          >
            <MarkerIcon>
              <img
                src={`http://localhost:8080/images/${marker.icon}`}
                alt={marker.icon}
                height={32}
                width={32}
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
  records: state.marker.records,
  isRemoved: state.marker.isRemoved
});

const mapDispatchToProps = {
  fetchRecords,
  getSelectedMarker,
  disableMarkers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerList);
