import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Map from './map';
import Panel from './panel';

class Main extends Component {
  render(){
    return(
      <Container className="main">
        <Row className="row">
          <Col className="col-lg-4">
            <Panel/>
          </Col>
          <Col className="col-lg-8">
            <Map/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
