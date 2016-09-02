import React, { Component } from 'react';
import styles from './styles/styles.js';
import {browserHistory} from 'react-router';
import {
  Button,
  Jumbotron,
  Panel
} from "react-bootstrap";

class Home extends Component {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  }
  gotoRoute(path) {
    browserHistory.push(path);
  }
  render() {
    return (
      <div className="Home">
        <Panel style={styles.panel}>
          <Jumbotron style={styles.jumbotron}>
            <h1>
              Pyramids
            </h1>
            <p>
              The object of this game is to remove cards from the pyramid to the foundation. this
              is done by selecting a card that is either a value higher or lower than the foundation
              card.  For example, when the foundation card is 4, a 3 or 5 may be removed from the
              pyramid.
            </p>
            <p>
              <Button onClick={() => {this.gotoRoute("/pyramids")}}>Play Pyramids!</Button>
            </p>
          </Jumbotron>
        </Panel>
      </div>
    );
  }
}

export default Home;
