import React from 'react';
import GameBoard from '../../components/GameBoard/GameBoard.js';
import Card from "../../components/Card/Card.js";
import Deck from "../../components/Deck/Deck.js";
import styles from "./styles/styles.js";
import constants from "../../constants.js";
import globals from "../../globalStyles.js";

export default class Pyramids extends React.Component {
    state = {
        cardsInPlay: [],
        currentCard: {},
        deck: [],
        gameState: constants.GAME_STATES.PLAYING,
        loading: true,
        score: 0,
        scoreMultiplier: 0
    };

    componentDidMount() {
      this.initGame();
    }

    checkCardAt(index) {
        const {cardsInPlay} = this.state;
        // console.info(`Checking card at index: ${index}`);
        let leftRightIndex;
        if (index >= 21) {        // 21 22 23 24 25 26 27
            return true;
        } else if (index >= 15) { //   15 16 17 18 19 20
            leftRightIndex = 6;
        } else if (index >= 10) { //     10 11 12 13 14
            leftRightIndex = 5;
        } else if (index >= 6) {  //       6  7  8  9
            leftRightIndex = 4;
        } else if (index >= 3) {  //         3  4  5
            leftRightIndex = 3;
        } else if (index >= 1) {  //           1  2
            leftRightIndex = 2;
        } else if (index === 0) { //             0
            leftRightIndex = 1;
        }
        if (cardsInPlay[index + leftRightIndex].played && cardsInPlay[index + leftRightIndex + 1].played) {
            return true;
        }
        return false;
    }

    checkGameStatus() {
      const game = this.state;
      if (game.cardsInPlay.length === 0) {
        game.gameState = constants.GAME_STATES.WIN;
      } else if (game.deck.length === 0) {
        const clickableCards = game.cardsInPlay.filter((card, i) => this.checkCardAt(i) && !card.played);
        if (!clickableCards.some((card) => this.isCardPlayable(card))) {
          game.gameState = constants.GAME_STATES.GAMEOVER;
        }
      }
      this.setState({game});
    }

    dealCards() {
      // console.info("deal cards");
      const {
        cardsInPlay,
        currentCard,
        deck
      } = this.state;
      const cardPositions = [];
      const center = styles.dealerGameContainer.width / 2;
      let cardsInRow = 0;
      let cards;
      let row = -1;
      for (let i = 0; i < cardsInPlay.length; i++) {
        cardsInRow++;
        row++;
        let leftStart = center - (cardsInRow * (globals.cardWidth / 2)) - (((cardsInRow) * styles.margin) / 2);
        cards = cardsInPlay.slice(i, i + cardsInRow);
        for (let j = 0; j < cards.length; j++) {
          const pos = {
            left: leftStart + (j * globals.cardWidth) + (j * styles.margin), // start + width + margin
            top: row * globals.cardHeight / 2
          };
          cardPositions.push(pos);
        }
      }
      return (
        <div className="dealer">
          <div className="dealerGameContainer" style={styles.dealerGameContainer}>
            <div style={styles.dealerCurrentCardContainer}>
              <Card
                clickable={deck.length > 0}
                onPlayableCardClick={(e) => this.onStackCardClick(e)}
                rank={currentCard.rank}
                show={true}
                styles={
                  styles.stackCard
                }
                suit={currentCard.suit}
              />
            </div>
            <div style={styles.dealerPyramidsTableContainer}>
              {cardsInPlay.map((card, i) => {
                const clickable = this.checkCardAt(i);
                return (
                  <div
                    style={{
                      ...cardPositions[i],
                      ...styles.cardPositionContainer
                    }}
                    key={i}
                  >
                    <Card
                      clickable={clickable}
                      key={i}
                      onPlayableCardClick={(e) => this.onPlayableCardClick(e)}
                      played={card.played}
                      rank={card.rank}
                      show={clickable}
                      styles={styles}
                      suit={card.suit}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    initGame() {
      const game = this.state;
      // fill deck with 52 cards
      game.deck = Deck.initDeck();
      // shuffle cards
      game.deck = Deck.shuffle(game.deck);
      game.cardsInPlay = game.deck.splice(0, 28); // take 28 cards off of the top
      game.currentCard = game.deck.pop();
      game.loading = false;
      game.gameState = constants.GAME_STATES.PLAYING;
      this.setState({game});
    }

    isCardPlayable(card) {
      const {currentCard} = this.state;
      if (card.rank === currentCard.rank - 1
          || card.rank === currentCard.rank + 1
          || (card.rank === 13 && currentCard.rank === 1)
          || (card.rank === 1 && currentCard.rank === 13)) {
          return true;
        }
      return false;
    }

    onStackCardClick(e) {
      const game = this.state;
      if (game.deck.length > 0) {
        game.currentCard = game.deck.pop();
        game.scoreMultiplier = 0;
        this.setState(game);
      }
      this.checkGameStatus();
    }

    onPlayableCardClick(e) {
      const {card} = e;
      if (card && this.isCardPlayable(card)) {
        this.replaceCurrentCard(card);
      }
      this.checkGameStatus();
    }

    replaceCurrentCard(card) {
        const game = this.state;
        game.currentCard = card;
        // look for card in cardsInPlay, set card to played
        const cardInPlay = game.cardsInPlay.find((c) => {
            return (c.rank === card.rank && c.suit === card.suit);
        });
        if (cardInPlay) {
            cardInPlay.played = true;
            game.scoreMultiplier++;
            game.score += 10 + (10 * game.scoreMultiplier);
        }
        this.setState(game);
    }

    render() {
        const {
            deck,
            gameState,
            loading,
            score
        } = this.state;
        return (
            <div>
                <h2>Pyramids</h2>
                {!loading && deck && (
                    <GameBoard
                      message={`Cards in stack: ${deck.length}`}
                      gameState={gameState}
                      restartGame={() => {this.initGame()}}
                      score={score}
                      style={styles.gameBoardContainer}
                    >
                        {this.dealCards()}
                    </GameBoard>
                )}
                {loading && !deck && (
                    <div className="loading">
                        Loading...
                    </div>
                )}
            </div>
        );
    }
}
