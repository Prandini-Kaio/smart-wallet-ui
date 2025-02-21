import {StyleSheet} from 'react-native';
import {black, gray, green, lightGreen, red, white, yellow } from '../../../../shared/utils/style-constants';

export const style = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: lightGreen
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

    shadowColor: '#FFF26',  
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 50,
    // Android Shadow
    elevation: 20,
  },
});

export const style2 = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
    marginVertical: 5,
    borderBottomColor: lightGreen,
    borderBottomWidth: 0.5
  },

  topOfContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },

  botOfContainer:{

  },

  txtDefault: {
    fontSize: 18,
    color: black,
    fontWeight: 'bold',
  },

  txtTt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: gray,
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
