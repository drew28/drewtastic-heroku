import globals from '../../../globalStyles.js';
import {constants} from '../../../constants.js';

export const cardDimensions = {
    height: globals.cardHeight,
    width: globals.cardWidth
}
export default {
    cardContainer: {
        backgroundColor: "#fff",
        fontSize: 15,
        fontWeight: "bold",
        ...cardDimensions
    },
    emptyCardContainer :{
        ...cardDimensions,
        padding: 1
        // border: "1px solid #282828"
    },
    blackOrRed: (suit) => {
      const {
        CLUBS,
        SPADES
      } = constants.SUITS;
      const color = {
        color: (suit === CLUBS || suit === SPADES) ? 'black' : 'red'
      };
      return color;
    }
}
