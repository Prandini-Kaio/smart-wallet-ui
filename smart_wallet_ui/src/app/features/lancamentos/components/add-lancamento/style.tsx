import { StyleSheet } from "react-native";
import { black, gray, gray2, green, lightGreen, white } from "../../../../shared/utils/style-constants";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: white
    },

    sendToContainer: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    moneyContaineir:{
        backgroundColor: gray2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

        width: '95%',
        height: 100,
        borderRadius: 15
    },

    contaPicker: {
        height: 25,
        width: 120,
        borderRadius: 30,
        backgroundColor: lightGreen,
        justifyContent: 'center',
    },

    txtConta: {
        fontSize: 14,
        color: black,
        fontWeight: 'bold'
    },

    txtCash: {
        color: gray,
        fontSize: 32,
        borderBottomColor: gray,
        borderBottomWidth: 0.5
    }
});