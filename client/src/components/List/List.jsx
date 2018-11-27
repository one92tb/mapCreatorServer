import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchSelectedMarkers } from "../../actions/fetchSelectedMarkers";
import { fetchRecords } from "../../actions/fetchRecords";
import { css } from "styled-components";

const Wrapper = styled.div`
  background: #f2f2f2;
  height: 100%;
  padding: 40px 20px;
`;

const Label = styled.label`
  margin: 0;
`;

const Select = styled.select`
  width: 200px;
  height: 40px;
  color: #000;
  display: block;
  text-align: center;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  text-align-last: center;
`;

const Input = styled.input`
  height: 40px;
  width: 200px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid transparent;
`;

const Form = styled.form`
  height: calc(10% - 20px);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  background: #00b8e6;
  display: flex;
  align-items: center;
  border-radius: 3px;
`;

const TableContainer = styled.div`
  height: 90%;
`;

const Table = styled.table`
  width: 100%;
  display: block;
  height: 100%;
`;

const Thead = styled.thead`
  display: table;
  width: 100%;
`;

const Tbody = styled.tbody`
  overflow: auto;
  overflow-x: hidden;
  display: block;
  width: 100%;
  height: 100%;
  height: calc(100% - 48px);
  text-align: center;
`;

const Tr = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  margin: 5px 0;
`;

const Cell = css`
  padding: 0.75rem;
  text-align: center;
  width: 10%;

  &:not(:first-child) {
    width: 15%;
  }
`;

const Th = styled.th`
  ${Cell};
  color: #fff;
  background: #00b8e6;
`;

const Td = styled.td`
  ${Cell};
  background: #4ddbff;
`;

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
