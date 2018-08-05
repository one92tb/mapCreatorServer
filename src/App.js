import React, {Component} from 'react';
import './App.css';
import NavBar from './components/nav';
import Marker from './components/marker';
import Main from './components/main';
import {Container, Row, Col} from 'reactstrap';
import MarkerCreator from './components/markerCreator';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Main />
  },
  {
    path: '/createMarker',
    main: () => <MarkerCreator />
  },
  {
    path: '/selectMarker',
    main: () => <Main />
  },
  {
    path: '/filterMarker',
    main: () => <Main />
  }
];

class App extends Component {

  render() {
    console.log(routes);
    return (<Router>
      <Container className="mainContainer">
        <header className="header">
          <span className="headerText">Map Creator</span>
        </header>
        <nav className="nav"><NavBar/></nav>
        <Switch>
          {routes.map((route,id) => (
            <Route
              key={id}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
        <footer className="footer">@Copyright</footer>
      </Container>
    </Router>);
  }
}

export default App;
