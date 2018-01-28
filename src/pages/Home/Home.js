import React, { Component } from 'react';
import radium from 'radium';
import styles from './styles/styles.js';
import dynamicSigns from '../../images/projects/expresslanesimages/dynamicsigns.png';
import historicRates from '../../images/projects/expresslanesimages/historicrates.png';
import tripCostEstimator from '../../images/projects/expresslanesimages/tripcostestimator.png';
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
  getFooterButton(route, title) {
    return (
      <div style={styles.panelFooter}>
        <Button
          bsStyle="primary"
          onClick={() => {this.gotoRoute(route)}}
        >
          {title}
        </Button>
        </div>
    );
  }
  getPanelHeader(title) {
    return (
      <div style={styles.panelHeader}>
        <h2>
          {title}
        </h2>
      </div>
    );
  }
  gotoRoute(path) {
    browserHistory.push(path);
  }
  render() {
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
    const carouselImages = [dynamicSigns, tripCostEstimator, historicRates];
    return (
      <div className="Home" style={styles.home}>
        Chop Shop Taco
      </div>
    );
  }
}

export default radium(Home);
