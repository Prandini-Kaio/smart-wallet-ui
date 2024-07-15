import {StyleSheet} from 'react-native';
import {black, gray, green, red, white} from '../../../shared/styleConstants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row', // Alinha itens em uma linha
    justifyContent: 'space-between', // Espaça os itens ao longo da linha
    alignItems: 'center', // Alinha itens verticalmente no centro
    padding: 16,
    marginBottom: 5,
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

    shadowColor: green,
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
    alignItems: 'flex-start'
  },

  rightTexts: {
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

  debitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: green
  },

  creditText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: red
  },
});
