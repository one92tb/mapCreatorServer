import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchIndicators } from "../../actions/mapIndicator/fetchIndicators";
import { fetchMarkers } from "../../actions/marker/fetchMarkers";
import BarGraph from "./BarGraph/BarGraph";
import PieGraph from "./PieChart/PieGraph";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import {
  ContainerStyle,
  RowStyle,
  ColStyle,
  Wrapper,
  Form,
  Input,
  Inner,
  TextBox,
  TextWrapper
} from "./style";

class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ""
    };
  }

  componentDidMount() {
    const { fetchIndicators, fetchMarkers } = this.props;
    fetchIndicators();
    fetchMarkers();
  }

  handleChange = e => {
    this.setState({
      city: e.target.value
    });
  };

  render() {
    const { indicators } = this.props;
    const { city } = this.state;

    const displayMarkers = Object.entries(
      indicators
        .filter((indicator, id, arr) => {
          return (
            (city === "" ||
              indicator.city.toLowerCase().search(city.toLowerCase()) !== -1) &&
            indicator
          );
        })
        .reduce((obj, el, id) => {
          obj[el.name] = obj[el.name] ? ++obj[el.name] : 1;
          return obj;
        }, {})
    );

    const displaySumMarkers = [["All markers", indicators.length]];

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
        {indicators.length === 0 ? (
          <TextWrapper>
            <TextBox>You have not any data to display on the charts</TextBox>
          </TextWrapper>
        ) : (
          <React.Fragment>
            <BarGraph displayMarkers={displayMarkers} />
            <Container fluid tag={ContainerStyle}>
              <Row tag={RowStyle}>
                <Col xl="6" lg="12" tag={ColStyle}>
                  <Inner>
                    <PieGraph displayMarkers={displaySumMarkers} />
                  </Inner>
                </Col>
                <Col xl="6" lg="12" tag={ColStyle}>
                  <Inner>
                    <PieGraph displayMarkers={displayMarkers} />
                  </Inner>
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  indicators: state.mapIndicator.indicators,
  markers: state.marker.markers
});

const mapDispatchToProps = {
  fetchIndicators,
  fetchMarkers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Statistic);

Statistic.propTypes = {
  fetchIndicators: PropTypes.func.isRequired,
  fetchMarkers: PropTypes.func.isRequired,
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      street: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      userId: PropTypes.number.isRequired
    })
  ).isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired
    })
  ).isRequired
};
