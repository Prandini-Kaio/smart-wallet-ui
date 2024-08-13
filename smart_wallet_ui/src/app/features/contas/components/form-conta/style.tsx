import {StyleSheet} from 'react-native';
import {lightGray, lightGreen, white} from '../../shared/styleConstants';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: white,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: lightGreen,
    borderWidth: 1
  },

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
    width: '100%',
    borderRadius: 10,
    color: lightGray
  },

  closeText: {
    marginTop: 20,
    color: 'blue',
  },

});
