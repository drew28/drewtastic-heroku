import React, { Component } from 'react';
import styles from './styles/styles.js';
import {Link} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="app" style={styles.app}>
        <header className="App-header" style={styles.appHeader}>
          <h2 style={styles.appIntro}>Drewtastic</h2>
        </header>
        <div id="container">
          {this.props.children}
        </div>
        <footer style={styles.appFooter}>
          <Link to="/">Drewtastic</Link>
        </footer>
      </div>
    );
  }
}

export default App;
