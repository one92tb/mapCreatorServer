import React, {Component} from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import MarkerCreator from './components/MarkerCreator/MarkerCreator';
import Map from './components/Map/Map';
import Panel from './components/Panel/Panel';

import {Container, Row, Col} from 'reactstrap';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const routes = [
  {
    path: '/',
    exact: true,
    section: () => <Map/>
  }, {
    path: '/createMarker',
    section: () => <MarkerCreator/>
  }, {
    path: '/selectMarker',
    section: () => <Map/>
  }, {
    path: '/filterMarker',
    section: () => <Map/>
  }
];

class App extends Component {

  render() {
    console.log(routes);
    return (<Router>
      <Container className="mainContainer">
        <header className="header">s
          <span className="headerText">Map Creator</span>
        </header>
        <nav className="nav"><NavBar/></nav>
        <Container className="main">
          <Row className="row">
            <Col className="col-lg-4">
              <Panel/>
            </Col>
            <Col className="col-lg-8">
              <Switch>
                {routes.map((route, id) => (<Route key={id} path={route.path} exact={route.exact} component={route.section}/>))}
              </Switch>
            </Col>
          </Row>
        </Container>
        <footer className="footer">@Copyright</footer>
      </Container>
    </Router>);
  }
}

export default App;
