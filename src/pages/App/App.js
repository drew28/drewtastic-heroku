import React, { Component } from 'react';
import logo from '../../logo.svg';
import './styles/App.css';
import {Link} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Drewtastic</h2>
        </header>
        <div id="container">
          {this.props.children}
        </div>
        <footer>
          <Link to="/">Drewtastic</Link>
        </footer>
      </div>
    );
  }
}

export default App;
