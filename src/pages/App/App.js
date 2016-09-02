import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import styles from './styles/styles.js';
import {Link} from 'react-router';
import GoogleAd from 'react-google-ad';

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
          <div className="google-ad-container" style={styles.googleAdContainer}>
            <GoogleAd client="ca-pub-7550332846806881" slot="1308243719" format="auto" />
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
