import { StyleSheet } from "react-native";
import { black, lightGreen } from "../../../../shared/utils/style-constants";

export const style = StyleSheet.create({
    container: {
        width: '30%',
        height: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: lightGreen,
        borderWidth: 1
    },

    moneyTxt: {
        color: black,
        fontWeight: 'bold',
        fontSize: 13
    }
})