import { StyleSheet } from "react-native";
import { backgroundColor, black, clearColor, gray, gray2, lightGreen, platina, principalColor, secondaryColor, white } from "../../../../shared/utils/style-constants";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: backgroundColor,
        padding: 5
    },

    sendToContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    moneyContaineir: {
        backgroundColor: secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

        width: '95%',
        height: 100,
        borderRadius: 15
    },

    contaPicker: {
        height:'30%', 
        backgroundColor: principalColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },

    txtConta: {
        fontSize: 14,
        color: clearColor,
        fontWeight: 'bold'
    },

    txtCash: {
        color: clearColor,
        fontSize: 32,
        borderBottomColor: clearColor,
        borderBottomWidth: 0.5
    },
    datePickerContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});