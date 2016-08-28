import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App/App';
import Home from './pages/Home/Home';
import Pyramids from './pages/Pyramids/Pyramids';
import './index.css';
import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-5940128-2');

function logPageView() {
  ReactGA.set({page: window.location.pathname});
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView} >
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="pyramids" component={Pyramids} />
    </Route>
  </Router>
),
  document.getElementById('root')
);
