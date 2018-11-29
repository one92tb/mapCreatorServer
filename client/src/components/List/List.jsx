import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSelectedMarkers } from "../../actions/fetchSelectedMarkers";
import { fetchRecords } from "../../actions/fetchRecords";
import {
  Wrapper,
  Label,
  Select,
  Input,
  Form,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from "./style";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerName: "All",
      city: ""
    };
  }

  componentDidMount() {
    const { fetchSelectedMarkers, fetchRecords } = this.props;

    fetchSelectedMarkers();
    fetchRecords();
  }

  handleChange = e => {
    if (e.target.name === "city") {
      this.setState({ city: e.target.value });
    } else {
      this.setState({ markerName: e.target.value });
    }
  };

  render() {
    console.log(this.state, this.props);

    const { markers, selectedMarkers } = this.props;
    const { markerName, city } = this.state;

    return (
      <Wrapper>
        <Form>
          <Label>
            <Select onChange={this.handleChange}>
              <option>All</option>
              {markers.map((marker, id, arr) => (
                <option key={id}>{marker.name}</option>
              ))};
            </Select>
          </Label>
          <Input
            onChange={this.handleChange}
            type="text"
            name="city"
            placeholder="search your city"
          />
        </Form>
        <TableContainer>
          <Table>
            <Thead>
              <tr>
                <Th>id</Th>
                <Th>marker name</Th>
                <Th>street</Th>
                <Th>city</Th>
                <Th>country</Th>
                <Th>description</Th>
                <Th>find on the map</Th>
              </tr>
            </Thead>
            <Tbody>
              {selectedMarkers
                .filter(marker => {
                  return (markerName === "All" && city === "") ||
                    (markerName === "All" &&
                      marker.city.toLowerCase().search(city.toLowerCase()) !==
                        -1)
                    ? marker
                    : markerName === marker.name && markerName === "All"
                      ? marker
                      : markerName === marker.name &&
                        marker.city.toLowerCase().search(city.toLowerCase()) !==
                          -1 &&
                        marker;
                })
                .map((marker, id) => (
                  <Tr key={marker.id}>
                    <Td>{id + 1}</Td>
                    <Td>{marker.name}</Td>
                    <Td>{marker.street}</Td>
                    <Td>{marker.city}</Td>
                    <Td>{marker.country}</Td>
                    <Td>description</Td>
                    <Td>go to</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  fetchSelectedMarkers,
  fetchRecords
};

const mapStateToProps = state => ({
  selectedMarkers: state.selectedMarker.selectedMarkers,
  markers: state.marker.records
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
