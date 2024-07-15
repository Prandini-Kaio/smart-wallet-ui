import { StyleSheet } from "react-native";
import { black, gray, green, purple, white } from "../../../shared/styleConstants";

export const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    card: {
        borderRadius: 20,
        marginVertical: 15,
        marginHorizontal: 5
    },

    cardFoot:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: 350,
        padding: 12
    },

    txtConta:{
        fontSize: 20,
        color: white,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    txtBold:{
        fontWeight: 'bold',
        color: white
    },

    txtSmall: {
        color: white
    }
})