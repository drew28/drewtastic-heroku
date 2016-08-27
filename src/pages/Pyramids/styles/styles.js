export default {
    gameboardContainer: {
        backgroundColor: "green",
        border: "2px solid #2828",
        minHeight: 600,
        minWidth: 800,
        textAlign: "center"
    },
    cardContainer: {
        border: "1px solid #484848",
        display: "inline-block"
    },
    emptyCardContainer: {
        alignSelf: "flex-end",
        display: "inline-block",
        height: 1
    },
    dealerCurrentCardContainer: {
        backgroundColor: "#282828",
        border: "1px dotted #898989",
        position: "relative",
        left: 8,
        top: 8,
        width: 100
    },
    dealerGameContainer: {
        margin: "0 auto",
        width: 500
    },
    dealerPyramidsTableContainer: {
        width: "100%"
    },
    dealerPyramidsTable: {
        width: "100%"
    },
    pyramidRow: (row) => {
        return {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
            textAlign: "center",
            height: 82,
            top: -50 * row
        }
    }
}
