import { StyleSheet } from 'react-native';
import { clearColor, highlightColor, lightGray, lightGreen, red, shadowClearColor, textBlackColor, textBlackSecondaryColor, textLightColor, white } from '../../../../shared/utils/style-constants';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  
  title: {
    color: textBlackColor,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    color: textBlackSecondaryColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    color: textBlackColor,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },

  picker: {
    height: 50,
    marginBottom: 10,
  },

  button: {
    backgroundColor: highlightColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: textLightColor,
    fontSize: 18,
  },

  errorText: {
    color: red,
    marginBottom: 10,
  },

  colorPreview: {
    height: 5,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 2
  },

  slider: {
    width: '100%',
    height: 40,
  },
});
