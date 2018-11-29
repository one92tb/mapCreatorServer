import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSelectedMarkers } from "../../actions/fetchSelectedMarkers";
import { fetchRecords } from "../../actions/fetchRecords";
import BarGraph from "./BarGraph/BarGraph";
import PieGraph from "./PieChart/PieGraph";
import { Container, Row, Col } from "reactstrap";
import {
  ContainerStyle,
  RowStyle,
  ColStyle,
  Wrapper,
  Form,
  Input
} from "./style";

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
