import React from 'react';
import defaultStyles from './styles/styles.js';
import deepmerge from 'deepmerge';

const Card = ({
    clickable = false,
    onPlayableCardClick = () => {},
    played = false,
    styles: themeStyles = {},
    suit = 'none',
    rank = 0
}) => {
    const getClassName = () => {
        if (clickable) {
            return  `${suit}${rank} ${clickable}`;
        }
        return '';
    }
    const getRank = (val) => {
        if (val === 1) {
            return 'A';
        }
        if (val === 11) {
            return 'J';
        }
        if (val === 12) {
            return 'Q';
        }
        if (val === 13) {
            return 'K';
        }
        return val;
    }
    const onClick = (e) => {
        if (clickable) {
            onPlayableCardClick({
                ...e,
                card: {
                    suit,
                    rank
                }
            })
        }
        return null;
    }
    const styles = deepmerge(defaultStyles, themeStyles);
    if (played) {
        return <div style={styles.emptyCardContainer}></div>;
    }
    return (
        <div
            className={`card ${getClassName()}`}
            onClick={(e) => onClick(e)}
            style={{
              ...styles.cardContainer,
              ...styles.blackOrRed(suit)
            }}
        >
            {`${suit} ${getRank(rank)}`}
            <br />
            {/* `${clickable ? 'up' : 'down'}` */}
        </div>
    );
};

Card.propTypes = {
  onPlayableCardClick: React.PropTypes.func,
  clickable: React.PropTypes.bool,
  played: React.PropTypes.bool,
  show: React.PropTypes.bool,
  styles: React.PropTypes.shape({
      cardContainer: React.PropTypes.object
  }),
  suit: React.PropTypes.string.isRequired,
  rank: React.PropTypes.number.isRequired
};

export default Card;
