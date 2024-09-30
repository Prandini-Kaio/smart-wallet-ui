import { StyleSheet } from "react-native"
import { black, clearColor, gray2, green, pewterBlue, principalColor, secondaryColor, shadowClearColor, textBlackColor, textLightColor, white } from "../../utils/style-constants"

export const style = StyleSheet.create({

    container: {
        flex: 1,
    },

    addButton: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        width: 60,
        height: 60,
        backgroundColor: principalColor,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 15,
        right: 15,
        shadowColor: black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 8
    },

    optionsContainer: {
        position: 'absolute',
        right: 20,
        bottom: 80,
        backgroundColor: clearColor,
        borderRadius: 8,
        elevation: 5,
        shadowColor: black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: gray2,
    },

    optionText: {
        fontSize: 16,
        color: textBlackColor,
    },
})