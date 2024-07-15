import { StyleSheet } from "react-native";
import { black, green, white } from "../../shared/styleConstants";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: white
    },

    title:{
        color: black,
        fontSize: 20,
        fontWeight: 'bold'
    },

    list:{
        paddingBottom: 5
    }
})