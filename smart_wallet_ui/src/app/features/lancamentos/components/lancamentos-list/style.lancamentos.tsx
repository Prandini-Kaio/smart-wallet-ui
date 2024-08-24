import { StyleSheet } from "react-native";
import { black, gray, green, white } from "../../../../shared/utils/style-constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: white
    },

    titleContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 5, 
        borderBottomColor: gray, 
        borderBottomWidth: 0.5
    },

    title:{
        color: black,
        fontSize: 18,
        fontWeight: 'bold'
    },

    list:{
        paddingBottom: 5
    }
})