const constants = {
  GAME_STATES: {
    PLAYING: 'GAME_STATES.PLAYING',
    GAMEOVER: 'GAME_STATES.GAMEOVER',
    WIN: 'GAME_STATES.WIN'
  },
  SUITS: {
    CLUBS: '♣',
    DIAMONDS: '♦',
    HEARTS: '♥',
    SPADES: '♠',
  },
  MOBILE_WIDTH: 992
};

const mediaQueries = {
  DESKTOP: "@media (min-width: 992px)",
  MOBILE: "@media (max-width: 480px), (max-height: 400px)",
  TABLET: "@media (max-width: 768px), (max-height: 400px)"
}

export default {
  constants,
  mediaQueries
}
