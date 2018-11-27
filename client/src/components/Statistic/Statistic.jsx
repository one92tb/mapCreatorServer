import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchSelectedMarkers } from "../../actions/fetchSelectedMarkers";
import { fetchRecords } from "../../actions/fetchRecords";
import BarGraph from "./BarGraph/BarGraph";
import PieGraph from "./PieChart/PieGraph";
import { Container, Row, Col } from "reactstrap";

const ContainerStyle = styled.div`
  height: 40%;
  padding: 0 !important;
`;

const RowStyle = styled.div`
  height: 100%;
  margin: 0 !important;
`;
const ColStyle = styled.div`
  padding: 0!important
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 40px 20px;
  background: #f2f2f2;
`;

const Form = styled.form`
  height: calc(10% - 20px);
  display: flex;
  padding-right: 30px;
  margin-bottom: 20px;
  justify-content: flex-end;
`;
const Input = styled.input`
  height: 40px;
  width: 250px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
`;

class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ""
    };
  }

  componentDidMount() {
    this.props.fetchSelectedMarkers();
    this.props.fetchRecords();
  }

  handleChange = e => {
    this.setState({
      city: e.target.value
    });
  };

  render() {
    const { selectedMarkers } = this.props;
    const { city } = this.state;

    const displayMarkers = Object.entries(
      selectedMarkers
        .filter((marker, id, arr) => {
          return (
            (city === "" ||
              marker.city.toLowerCase().search(city.toLowerCase()) !== -1) &&
            marker
          );
        })
        .reduce((obj, el, id) => {
          obj[el.name] = obj[el.name] ? ++obj[el.name] : 1;
          console.log(obj);
          return obj;
        }, {})
    );

    const displaySumMarkers = [["All markers", selectedMarkers.length]];

    return (
      <Wrapper>
        <Form>
          <label>
            <Input
              onChange={this.handleChange}
              type="text"
              name="city"
              placeholder="search your city"
            />
          </label>
        </Form>
        <BarGraph displayMarkers={displayMarkers} />
        <Container fluid tag={ContainerStyle}>
          <Row tag={RowStyle}>
            <Col lg="6" tag={ColStyle}>
              <PieGraph displayMarkers={displaySumMarkers} />
            </Col>
            <Col lg="6" tag={ColStyle}>
              <PieGraph displayMarkers={displayMarkers} />
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  selectedMarkers: state.selectedMarker.selectedMarkers,
  markers: state.marker.records
});

const mapDispatchToProps = {
  fetchSelectedMarkers,
  fetchRecords
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Statistic);
