import React, { Component } from 'react';
import styles from './styles/styles.js';
import {browserHistory} from 'react-router';
import {
  Button,
  CardActions,
  Card as MDLCard,
  CardText,
  CardTitle
} from 'react-mdl';

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
      <MDLCard shadow={0} style={styles.gameCard}>
        <CardTitle style={styles.gameCardTitle}>
          Pyramids
        </CardTitle>
        <CardText style={styles.gameCardText}>
          <p>
            The object of this game is to remove cards from the pyramid to the foundation. this
            is done by selecting a card that is either a value higher or lower than the foundation
            card.  For example, when the foundation card is 4, a 3 or 5 may be removed from the
            pyramid.
          </p>
        </CardText>
        <CardActions border>
          <Button colored onClick={() => {this.gotoRoute("/pyramids")}}>Play Pyramids!</Button>
        </CardActions>
      </MDLCard>
      </div>
    );
  }
}

export default Home;
