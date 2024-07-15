import { StyleSheet } from "react-native"
import { black, green, lightGray, lightGreen, white } from "../../shared/styleConstants"

export const style = StyleSheet.create({
    floatingButton:{
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        width: 60,
        height: 60,
        backgroundColor: white,
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
    
    txtButton: {
        color: green,
        fontWeight: 'bold',
        fontSize: 14
    },

    icon:{
        color: green,
        fontWeight: 'bold',
        fontSize: 24
    }
})