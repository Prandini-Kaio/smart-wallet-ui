import {SafeAreaView, Text, View} from 'react-native';
import {style} from './style';

export default function CardGastos({navigation, gasto}: any) {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.intern}>
        <View style={style.gastoMensal}>
          <Text style={style.txtMain}>Gasto mensal</Text>
          <Text style={style.txtMain}>R$ 350,87</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.txtSecond}>Julho</Text>
          <Text style={style.txtSecond}>R$ 220,98</Text>
        </View>

        <View style={style.gastoMensal}>
          <Text style={style.txtThird}>Mês anterior</Text>
          <Text style={style.txtThird}>R$ 110,25</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.txtSecond}>Junho</Text>
          <Text style={style.txtSecond}>R$ 140,99</Text>
        </View>


        <View style={style.gastoMensal}>
          <Text style={style.txtThird}>Próximo mês</Text>
          <Text style={style.txtThird}>R$ 110,25</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.txtSecond}>Agosto</Text>
          <Text style={style.txtSecond}>R$ 140,99</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}
