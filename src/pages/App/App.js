import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import styles from './styles/styles.js';
import {Link} from 'react-router';

class App extends Component {
  render() {
    return (
      <StyleRoot>
        <div className="app" style={styles.app}>
          <header className="app-header" style={styles.appHeader}>
            <h2 style={styles.appIntro}>Drewtastic</h2>
          </header>
          <div id="content-container" style={styles.appContentContainer}>
            {this.props.children}
          </div>
          <footer style={styles.appFooter}>
            <Link to="/">Drewtastic</Link>
          </footer>
        </div>
      </StyleRoot>
    );
  }
}

export default App;
