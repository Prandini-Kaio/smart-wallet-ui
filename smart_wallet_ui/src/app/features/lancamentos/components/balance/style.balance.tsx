import { StyleSheet } from "react-native";
import { gray, green } from "../../../../shared/utils/style-constants";


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        width: 300,
        height: 300,
        borderRadius: 150, // Deve ser metade do width/height para um círculo perfeito
        backgroundColor: 'white', // Certifique-se de que 'white' está definido ou use uma string de cor válida
        alignItems: 'center',
        justifyContent: 'center',
        // iOS Shadow
        shadowColor: green,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        // Android Shadow
        elevation: 20,
    },

    totalNum: {
        marginVertical: 30,
        fontSize: 30,
        color: green,
        fontWeight: 'bold',
    },

    text: {
        color: gray,
        fontSize: 15,
    },

    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    icon : {
        fontSize: 20,
        color: gray,
        marginLeft: 5
    }
})