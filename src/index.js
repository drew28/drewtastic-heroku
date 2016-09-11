import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App/App';
import Home from './pages/Home/Home';
import Blocks from './pages/Blocks/Blocks.js';
import Pyramids from './pages/Pyramids/Pyramids';
import GameOfLife from './pages/GameOfLife/GameOfLife';
import './index.css';
import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactGA.initialize('UA-5940128-2');

const isLocalhost = !!(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function logPageView() {
  if (!isLocalhost) {
    ReactGA.set({page: window.location.pathname});
    ReactGA.pageview(window.location.pathname);
 }
}

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView} >
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="blocks" component={Blocks} />
      <Route path="gameoflife" component={GameOfLife} />
      <Route path="pyramids" component={Pyramids} />
    </Route>
  </Router>
),
  document.getElementById('root')
);
