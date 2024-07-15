import {Dimensions, StyleSheet} from 'react-native';
import {green, white} from '../../shared/styleConstants';

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
