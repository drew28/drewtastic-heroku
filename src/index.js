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

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="pyramids" component={Pyramids} />
    </Route>
  </Router>
),
  document.getElementById('root')
);
