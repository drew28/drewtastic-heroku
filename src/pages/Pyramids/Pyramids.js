import React from 'react';
import GameBoard from '../../components/GameBoard/GameBoard.js';
import Card from "../../components/Card/Card.js";
import Deck from "../../components/Deck/Deck.js";
import styles from "./styles/styles.js";

export default class Pyramids extends React.Component {
    state = {
        cardsInPlay: [],
        currentCard: {},
        deck: [],
        loading: true,
        score: 28
    };

    componentDidMount() {
        const game = this.state;
        // fill deck with 52 cards
        game.deck = Deck.initDeck();
        // shuffle cards
        game.deck = Deck.shuffle(game.deck);
        game.cardsInPlay = game.deck.splice(0, 28); // take 28 cards off of the top
        game.currentCard = game.deck.pop();
        game.loading = false;
        this.setState({game});
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

    dealCards() {
        // console.info("deal cards");
        const {
            currentCard,
            deck
        } = this.state;
        return (
            <div className="dealer">
                <div className="dealerGameContainer" style={styles.dealerGameContainer}>
                    <div style={styles.dealerCurrentCardContainer}>
                        <Card
                            clickable={deck.length > 0}
                            onPlayableCardClick={(e) => this.onStackCardClick(e)}
                            rank={currentCard.rank}
                            show={true}
                            suit={currentCard.suit}
                        />
                    </div>
                    <div style={styles.dealerPyramidsTableContainer}>
                        {this.getRows()}
                    </div>
                </div>
            </div>
        );
    }

    getRows() {
        // console.info("get rows");
        const {
            cardsInPlay
        } = this.state;
        let rows = [];
        let cardSlice;
        let cardsInRow = 0;
        try {
            for (let i = 0; i < cardsInPlay.length - 1; i+=0) {
                cardsInRow++;
                cardSlice = cardsInPlay.slice(i, i + cardsInRow);
                // console.info(`NEW ROW: i: ${i}, cIR: ${cardsInRow}, cSL: ${cardSlice.length}`);
                rows.push(<div style={styles.pyramidRow(rows.length)}>
                        {
                            cardSlice.map((card) => {
                                const clickable = this.checkCardAt(i);
                                // console.info(`card: ${i}, clickable: ${clickable}`, card);
                                i++;
                                return (
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
                                )
                            })
                        }
                    </div>
                )
            }
        } catch (e) {
            console.error("Pyramids::getRows()", e);
        }
        return rows;
    }

    onStackCardClick(e) {
        console.info("onStackCardClick", e);
        const game = this.state;
        if (game.deck.length > 0) {
            game.currentCard = game.deck.pop();
            this.setState(game);
        }
    }

    onPlayableCardClick(e) {
        console.info(`clicked ${e.card.rank} of ${e.card.suit}`);
        const {card} = e;
        const {currentCard} = this.state;
        if (card) {
            if (card.rank === currentCard.rank - 1 || card.rank === currentCard.rank + 1) {
                // 2 thru 12 test
                this.replaceCurrentCard(card);
            } else if ((card.rank === 13 && currentCard.rank === 1) || (card.rank === 1 && currentCard.rank === 13)) {
                // king to ace
                this.replaceCurrentCard(card);
            }
        }
    }

    replaceCurrentCard(card) {
        const game = this.state;
        game.currentCard = card;
        // look for card in cardsInPlay, set card to played
        const cardInPlay = game.cardsInPlay.find((c) => {
            return (c.rank === card.rank && c.suit === card.suit);
        });
        if (cardInPlay) {
            console.info("played card");
            cardInPlay.played = true;
        }
        this.setState(game);
    }

    render() {
        const {
            deck,
            loading,
            score
        } = this.state;
        return (
            <div>
                <h2>Pyramids</h2>
                {!loading && deck && (
                    <GameBoard score={score}>
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
