import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {style} from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {black, lightGray, lightGreen} from '../../../shared/styleConstants';
import { Conta } from '../../../../context/api/api';

export default function CardContas({nome, banco, dtVencimento, tipoConta}: Conta) {
  return (
    <SafeAreaView style={style.container}>
      <View style={[style.card, {backgroundColor: lightGreen}]}>
        <Text style={style.txtConta}>{banco}</Text>

        <Text style={[style.txtBold, {alignSelf: 'center'}]}>{tipoConta.toString()}</Text>

        <View
          style={style.cardFoot}
        >

          <View style={{flexDirection: 'column'}}>
            <Text style={style.txtBold}>Conta</Text>
            <Text style={style.txtSmall}>{nome}</Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={style.txtBold}>Vencimento</Text>
            <Text style={style.txtSmall}>{dtVencimento}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
