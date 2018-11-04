import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchSelectedMarkers } from "../../actions/fetchSelectedMarkers";
import { fetchRecords } from "../../actions/fetchRecords";
import BarGraph from "./BarGraph/BarGraph";
import PieGraph from "./PieChart/PieGraph";
import { Container, Row, Col } from "reactstrap";

const ContainerStyle = styled.div`
  height: 50%;
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

class Statistic extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSelectedMarkers();
    this.props.fetchRecords();
  }

  render() {
    const displayMarkers = Object.entries(
      this.props.selectedMarkers.reduce((obj, el, id) => {
        obj[el.name] = obj[el.name] ? ++obj[el.name] : 1;
        return obj;
      }, {})
    );

    const displaySumMarkers = [["markers", this.props.selectedMarkers.length]];

    console.log(this.props, displayMarkers, displaySumMarkers);
    return (
      <Wrapper>
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

/*{Object.entries(
  state.selectedMarker.selectedMarkers.reduce((obj, el, id) => {
    obj[el.name] = obj[el.name] ? ++obj[el.name] : 1;
    return obj;
  }, {})
).map(el => {
  console.log(el);
  return {
    name: el[0],
    value: el[1]
  };
})}*/
