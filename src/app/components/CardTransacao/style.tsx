import {StyleSheet} from 'react-native';
import {black, gray, green, lightGray, lightGreen, white } from '../../shared/styleConstants';

export const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  card: {
    backgroundColor: white,
    width: '90%',
    height: '70%',
    borderRadius: 20,
    alignItems: 'center',
    borderColor: lightGreen,
    borderWidth: 0.8
  },

  infoCard: {
    alignItems: 'center',
  },

  txtTitle: {
    fontSize: 20,
    color: black,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8,
  },

  iconeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,

    shadowColor: green,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 50,
    // Android Shadow
    elevation: 20,
  },
});
