import React, { Component } from 'react';
// import './styles/App.css';
import {Link} from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="Home">
        <p className="App-intro">
          <Link to="/pyramids">Pyramids</Link>
        </p>
      </div>
    );
  }
}

export default App;
