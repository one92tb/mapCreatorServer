import React, { Component } from "react";
import { fetchRecords } from "../../../actions/fetchRecords";
import { getSelectedMarker } from "../../../actions/getSelectedMarker";
import { connect } from "react-redux";
import styled from "styled-components";

const List = styled.div`
  list-style: none;
  padding: 0;
`;

const Marker = styled.li`
  margin-bottom: 5px;
  border: 1px solid #4ddbff;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  margin-bottom: 5px !important;
  padding: 0 !important;
  display: flex;

  &:hover{
    background: #4ddbff;
    cursor: pointer;
  }

  ${({ selected }) =>
    selected &&
    `
    background: #00b8e6
  `};
`;

const MarkerIcon = styled.div`
  margin: 0 10px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarkerName = styled.span`
  width: 75%;
  float: left;
  display: flex;
  align-items: center;
`;

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: ""
    };
  }

  componentDidMount() {
    this.props.fetchRecords();
  }

  onSelect = (marker, id) => {
    const getSelectedMarker = this.props.getSelectedMarker;

    if (marker.id === this.state.selectedId) {
      id = "";
      this.setState({ selectedId: id });
      getSelectedMarker({
        id: undefined,
        name: "",
        url: "IMG-default.png"
      });
    } else {
      this.setState({ selectedId: id });
      getSelectedMarker({
        ...marker,
        url: `http://localhost:8080/images/${marker.icon}`
      });
    }
  };

  render() {
    const selectedId = this.state.selectedId;

    return (
      <List>
        {this.props.records.map((marker, id) => (
          <Marker
            key={marker.id}
            selected={selectedId === marker.id}
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
  getSelectedMarker
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerList);
