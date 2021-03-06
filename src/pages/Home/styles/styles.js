import {constants, mediaQueries} from '../../../constants.js';
const {DESKTOP} = mediaQueries;

export default {
  gameCardTitle: {
    color: "#fff",
    backgroundColor: "#282"
  },
  gameCardText: {
    textAlign: "left"
  },
  githubIcon: {
    margin: "0 0 0 10px"
  },
  githubLink: {
    color: "#282828",
    fontSize: 14
  },
  googleAdContainer: {
    margin: "20px auto",
    [DESKTOP]: {
      width: constants.MOBILE_WIDTH
    }
  },
  googlePlayButton: {
    height: "auto",
    width: 240
  },
  home: {
    [DESKTOP]: {
      margin: "0 auto",
      width: constants.MOBILE_WIDTH
    }
  },
  jumbotron: {
    margin: '0 auto',
    padding: "10px 20px",
    textAlign: "left",
    width: "100%"
  },
  panel: {
    margin: "10px auto",
    textAlign: "left",
    width: "100%"
  },
  panelFooter: {
    textAlign: "right"
  },
  panelHeader: {
    textAlign: "left"
  },
  screenshotCarousel: {
    textAlign: "center",
    width: 175
  },
  screenshotCarouselContainer: {
    textAlign: "center",
    width: 300
  }
};
