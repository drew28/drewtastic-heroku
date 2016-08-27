import React from 'react';
import styles from "./styles/styles.js";

export default class GameBoard extends React.Component {
    static propTypes = {
        children: React.PropTypes.element, // usually a <Dealer
        score: React.PropTypes.number
    };
    // render score
    // render avatar
    // render hi-scores
    componentWillMount() {
        console.info("GameBoard started.");
    }
    render() {
        const {
            children,
            score
        } = this.props;
        return (
            <div id="gameboard" style={styles.gameboardContainer}>
                <div id="scoreContainer">Score: {score}</div>
                {children}
            </div>
        );
    }
}
