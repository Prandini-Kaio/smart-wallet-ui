import {StyleSheet} from 'react-native';
import {black, gray, gray2, green, red, white} from '../../../shared/utils/style-constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: white,
  },

  iconContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    width: 50,
    height: 50,
    borderRadius: 25,

    shadowColor: gray2,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 15,
    // Android Shadow
    elevation: 20,
  },

  icon: {
    color: gray,
    fontSize: 20,
  },

  leftTexts: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 5
  },

  rightTexts: {
    width: 120,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },

  baseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: black
  },

  alternatText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: gray
  },

  valorContainer:{
    flexDirection: 'row',
  },

  moneyTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
