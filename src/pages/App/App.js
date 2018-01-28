import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import styles from './styles/styles.js';
import {Link} from 'react-router';
import Navigation from '../../components/Navigation/Navigation.js';

class App extends Component {
  render() {
    return (
      <StyleRoot>
        <div className="app" style={styles.app}>
          {/* <header className="app-header" style={styles.appHeader}>
            <h2 style={styles.appIntro}>Drewtastic</h2>
          </header> */}
          <Navigation />
          <div id="content-container" style={styles.appContentContainer}>
            {this.props.children}
          </div>
          <footer style={styles.appFooter}>
            <Link to="/">Chop Shop Taco</Link>
          </footer>
        </div>
      </StyleRoot>
    );
  }
}

export default App;
