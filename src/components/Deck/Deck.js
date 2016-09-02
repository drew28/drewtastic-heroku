// import {logging} from 'react-server';

// const logger = logging.getLogger(__LOGGER__);
import {constants} from '../../constants.js';

class Deck {
    initDeck() {
        let deck = [];
        const {
          CLUBS,
          DIAMONDS,
          HEARTS,
          SPADES
        } = constants.SUITS;
        const suits = [SPADES, CLUBS, DIAMONDS, HEARTS];// &spades; &hearts; &diams; &clubs;
        suits
        .forEach((suit) => {
            for (let rank = 1; rank < 14; rank++) {
                // logger.info(`Create card ${rank} of ${suit}`);
                deck.push({
                    suit,
                    rank: rank
                });
            }
        })
        return deck;
    }

    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    }
}

export default new Deck();
