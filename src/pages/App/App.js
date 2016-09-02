import React, { Component } from 'react';
import styles from './styles/styles.js';
import {Link} from 'react-router';
import constants from '../../constants.js';
import GoogleAd from 'react-google-ad';

class App extends Component {
  render() {
    const isMobile = window.innerWidth < constants.MOBILE_WIDTH;
    return (
      <div className="app" style={styles.app}>
        <header className="App-header" style={styles.appHeader}>
          <h2 style={styles.appIntro}>Drewtastic</h2>
        </header>
        <div id="container">
          {this.props.children}
        </div>
        {isMobile && (
          <GoogleAd client="ca-pub-7550332846806881" slot="1308243719" format="auto" />
        )}
        {!isMobile && (
          <GoogleAd client="ca-pub-7550332846806881" slot="2381350913" format="728x90" />
        )}
        <footer style={styles.appFooter}>
          <Link to="/">Drewtastic</Link>
        </footer>
      </div>
    );
  }
}

export default App;
