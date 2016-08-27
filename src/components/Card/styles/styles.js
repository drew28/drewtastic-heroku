export const cardDimensions = {
    height: 80,
    width: 40
}
export default {
    cardContainer: {
        backgroundColor: "#fff",
        ...cardDimensions
    },
    emptyCardContainer :{
        ...cardDimensions,
        padding: 1
        // border: "1px solid #282828"
    }
}
