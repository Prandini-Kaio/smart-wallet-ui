import {Dimensions, StyleSheet} from 'react-native';
import {green, white} from '../../../../shared/utils/style-constants';

const {width: screenWidth} = Dimensions.get('window');

export const style = StyleSheet.create({
  container: {
    height: '30%',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
});

export const style2 = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
  },

  card: {
      borderRadius: 20,
      marginVertical: 15,
      marginHorizontal: 5
  },

  cardFoot:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      width: 350,
      padding: 12
  },

  txtConta:{
      fontSize: 20,
      color: white,
      fontWeight: 'bold',
      alignSelf: 'center'
  },

  txtBold:{
      fontWeight: 'bold',
      color: white
  },

  txtSmall: {
      color: white
  }
})