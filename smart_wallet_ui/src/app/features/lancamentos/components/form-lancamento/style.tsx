import {StyleSheet} from 'react-native';
import { lightGreen, white } from '../../../../shared/utils/style-constants';

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

  parInput: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  modalContainer: {
    width: 300,
    height: '70%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: lightGreen,
    borderWidth: 1,
  },
});