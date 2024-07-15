import { StyleSheet } from "react-native";
import { black, gray, green, lightGray, lightGreen, white } from "../../shared/styleConstants";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 24,
        backgroundColor: white,
        borderColor: lightGreen,
        borderWidth: 1.5,
        borderRadius: 5
    },

    intern: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        marginVertical: 40,
        marginHorizontal: 20
    },

    top: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        margin: 10
    },

    bot: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        marginBottom: 10
    },

    gastoMensal:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    txtMain: {
        fontSize: 24,
        fontWeight: 'bold',
        color: black,
    },

    txtSecond: {
        fontSize: 15,
        color: lightGray,
    },

    txtThird: {
        fontSize: 20,
        fontWeight: 'bold',
        color: black,
    }
})