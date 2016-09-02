import React from 'react';
import styles from "./styles/styles.js";
import {constants} from  '../../constants.js';

export default class GameBoard extends React.Component {
    static propTypes = {
        children: React.PropTypes.element, // usually a <Dealer
        gameState: React.PropTypes.string,
        message: React.PropTypes.string,
        restartGame: React.PropTypes.func.isRequired,
        score: React.PropTypes.number
    };
    clickRestartGame() {
      const {restartGame} = this.props;
      restartGame();
    }
    // render avatar
    // render hi-scores
    componentWillMount() {
        // console.info("GameBoard started.");
    }
    render() {
        const {
            children,
            gameState,
            message,
            score
        } = this.props;
        const gameOver = constants.GAME_STATES.GAMEOVER === gameState;
        const gameStateReadable = (gameOver) ? "Game Over" : "Enjoy the game!";
        return (
            <div id="gameboard" style={styles.gameboardContainer}>
                <div id="scoreContainer">Score: {score}</div>
                <div id="stateContainer">State: {gameStateReadable}</div>
                <div id="messageContainer">{message}</div>
                {gameOver && (
                  <div id="restartGame">
                    <button onClick={() => this.clickRestartGame()}>Restart game</button>
                  </div>
                )}
                {children}
            </div>
        );
    }
}
