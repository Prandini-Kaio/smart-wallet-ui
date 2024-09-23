import { StyleSheet } from "react-native";
import { black, highlightColor, lightGreen, secondaryColor, textBlackColor, textLightColor } from "../../../../shared/utils/style-constants";

export const style = StyleSheet.create({
    container: {
        width: '30%',
        height: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: highlightColor,
        borderWidth: 1
    },

    moneyTxt: {
        color: textLightColor,
        fontWeight: 'bold',
        fontSize: 13
    }
})