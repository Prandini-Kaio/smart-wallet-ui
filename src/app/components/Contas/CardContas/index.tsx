import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {style} from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {black} from '../../../shared/styleConstants';

export default function CardContas({navigation, conta, banco, vencimento, color}: any) {
  return (
    <SafeAreaView style={style.container}>
      <View style={[style.card, {backgroundColor: color}]}>
        <Text style={style.txtConta}>{banco}</Text>

        <View
          style={style.cardFoot}
        >

          <View style={{flexDirection: 'column'}}>
            <Text style={style.txtBold}>Conta</Text>
            <Text style={style.txtSmall}>{conta}</Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={style.txtBold}>Vencimento</Text>
            <Text style={style.txtSmall}>{vencimento}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
