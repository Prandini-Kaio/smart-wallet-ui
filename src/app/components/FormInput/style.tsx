import { StyleSheet } from "react-native";
import { gray, lightGray } from "../../shared/styleConstants";

export const style = StyleSheet.create({
    label: {
        color: lightGray,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
      },

      input: {
        height: 40,
        borderColor: lightGray,
        borderWidth: 0.5,
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        color: lightGray,
      },

      inputContainer: {
        height: 40,
        width: '100%',
        borderColor: gray,
        borderWidth: 0.5,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'center',
      },
    
      picker: {
        height: 40,
        color: lightGray,
      },
})