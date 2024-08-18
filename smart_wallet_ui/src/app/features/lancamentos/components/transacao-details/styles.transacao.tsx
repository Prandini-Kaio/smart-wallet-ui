import { StyleSheet } from 'react-native';
import { gray } from '../../../../shared/utils/style-constants';

export const style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    justifyContent: 'space-between'
  },

  inside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  txtLabel: {
    fontSize: 14,
    color: gray,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8,
  },

  txtTt: {
    fontSize: 14,
    color: gray,
    textAlign: 'center',
    paddingTop: 8
  },

  txtSecond: {
    fontSize: 14,
    color: gray,
    textAlign: 'center',
    paddingTop: 8
  },

  txtThrid: {
    fontSize: 12,
    fontWeight: 'bold',
    color: gray,
    textAlign: 'center',
    paddingTop: 8
  },
});
