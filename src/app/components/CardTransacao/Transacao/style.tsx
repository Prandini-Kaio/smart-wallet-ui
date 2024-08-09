import {StyleSheet} from 'react-native';
import {
  black,
  gray,
  gray2,
  green,
  lightGray,
  lightGreen,
  red,
  yellow,
} from '../../../shared/styleConstants';

export const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: '100%',
    height: 40,

    borderBottomColor: lightGreen,
    borderBottomWidth: 0.5
  },

  topOfContainer:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    
  },

  botOfContainer:{

  },

  txtDefault: {
    fontSize: 18,
    color: black,
    fontWeight: 'bold',
  },

  txtSecond: {
    fontSize: 12,
    color: gray,
  },

  txtYellow: {
    fontSize: 18,
    color: yellow,
    fontWeight: 'bold',
  },

  txtRed: {
    fontSize: 18,
    color: red,
    fontWeight: 'bold',
  },

  txtGreen: {
    fontSize: 18,
    color: green,
    fontWeight: 'bold',
  },
});
