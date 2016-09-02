import React, { Component } from 'react';
import styles from './styles/styles.js';
import {Link} from 'react-router';
import GoogleAd from 'react-google-ad';

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
        <div
          className="googleAdContainer728x90"
          style={styles.googleAd728x90}>
          <GoogleAd
            display="inline"
            height="90px"
            width="728px"
            client="ca-pub-7550332846806881"
            format="728x90"
            slot="2381350913"
          />
        </div>
        <footer style={styles.appFooter}>
          <Link to="/">Drewtastic</Link>
        </footer>
      </div>
    );
  }
}

export default App;
