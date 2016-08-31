import globals from '../../../globalStyles.js';

export default {
    gameboardContainer: {
        backgroundColor: "green",
        border: "2px solid #2828",
        minHeight: 400,
        minWidth: (globals.cardWidth * 7) + 100,
        textAlign: "center"
    },
    cardContainer: {
        border: "1px solid #484848",
        position: "aboslute"
    }
}
