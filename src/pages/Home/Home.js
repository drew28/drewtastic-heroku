import React, { Component } from 'react';
import radium from 'radium';
import styles from './styles/styles.js';
import {browserHistory} from 'react-router';
import {
  Button,
  Carousel,
  Col,
  Grid,
  Jumbotron,
  Panel,
  Row
} from "react-bootstrap";
import GoogleAd from 'react-google-ad';
import githubIcon from '../../images/GitHub-Mark-32px.png';

class Home extends Component {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  }
  gotoRoute(path) {
    browserHistory.push(path);
  }
  render() {
    const expressLanesHeader = (
      <div style={styles.panelHeader}>
        <h2>
          Express Lanes Images
        </h2>
      </div>
    );
    const googlePlayFooter = (
      <div style={styles.panelFooter}>
        <a
          href='https://play.google.com/store/apps/details?id=com.atreid.expresslanesimages&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
        >
          <img
            alt='Get it on Google Play'
            src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'
            style={styles.googlePlayButton}
          />
        </a>
      </div>
    );
    return (
      <div className="Home" style={styles.home}>
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
              <Button
                bsStyle="primary"
                onClick={() => {this.gotoRoute("/pyramids")}}
              >
                Play Pyramids!
              </Button>
            </p>
          </Jumbotron>
        </Panel>
        <div className="google-ad-container" style={styles.googleAdContainer}>
          <GoogleAd client="ca-pub-7550332846806881" slot="1308243719" format="auto" />
        </div>
        <Panel
          footer={googlePlayFooter}
          header={expressLanesHeader}
          style={styles.panel}
        >
          <p>
            View the dynamic signs from the express lanes of 495 and 95 in Northern Virginia. Estimate the current cost of a trip and find how much a trip cost within the last 30 days.
          </p>
          <Grid>
            <Row>
              <Col xs={12} md={8}>
                <ul><strong>Features</strong>
                  <li>95 North and South HOV direction status</li>
                  <li>Load dynamic images of signs from URL</li>
                  <li>Trip cost estimator form</li>
                  <li>Historic rates form</li>
                  <li>Swipe down to refresh</li>
                </ul>
                <ul><strong>Planned features</strong>
                  <li>Swipe to hide signs</li>
                  <li>Favorite trips routes</li>
                  <li>Settings view to choose which dynamic images you want to show</li>
                  <li>Group signs for (4)95N&S</li>
                </ul>
                <a
                  href="https://github.com/drew28/expresslaneimages"
                  style={styles.githubLink}
                  target="_blank"
                >
                  View on GitHub
                  <img
                    alt="View on GitHub"
                    height={32}
                    src={githubIcon}
                    style={styles.githubIcon}
                    width={32}
                  />
                </a>
              </Col>
              <Col xs={6} md={4} style={styles.screenshotCarouselContainer}>
                <Carousel style={styles.screenshotCarousel}>
                  <Carousel.Item>
                    <img
                      alt=""
                      height={334}
                      src="https://lh3.googleusercontent.com/xLPV0hEoXQuabXszYZZKvBXQu9cvUA63LlQ2TSmqXN8j35T1zZ4TtVzaRkSP6gZJ6B0=h310-rw"
                      width="auto"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      alt=""
                      height={334}
                      src="https://lh3.googleusercontent.com/LSU4JBjr2sxF6yGhKPBoNCRJ5nTXlDvBc4CIA3PRHEvpZpmACILVJNnLcxclzInmUqQ3=h310-rw"
                      width="auto"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      alt=""
                      height={334}
                      src="https://lh3.googleusercontent.com/KQAKxYX8KbYCqOAdhJWw0nIHKa5BvH4I_55ne_vFzImQuGw48tWZqvi6UK2DrrTDFg=h310-rw"
                      width="auto"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}

export default radium(Home);
