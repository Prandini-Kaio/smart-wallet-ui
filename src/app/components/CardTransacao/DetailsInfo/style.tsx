import {StyleSheet} from 'react-native';
import {gray} from '../../../shared/styleConstants';

export const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },

  txtLabel: {
    fontSize: 14,
    color: gray,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8,
  },

  txtSecond: {
    fontSize: 12,
    color: gray,
    textAlign: 'center',
    paddingTop: 8,
  },
});
