import {SafeAreaView, Text, View} from 'react-native';
import {style} from './style';
import {TotalizadorGastos} from '../../entities/conta.entity';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useResumoFinanceiro} from '../../services/contas.service';

export default function CardGastos({navigation, gasto}: any) {
  const focus = useIsFocused();

  const {fetchResumoFinanceiro} = useResumoFinanceiro();

  const [totalizador, setTotalizador] = useState<TotalizadorGastos>();

  useEffect(() => {
    const fetchTotalizador = async () => {
      try {
        const resultado = await fetchResumoFinanceiro();
        setTotalizador(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalizador();
  }, [focus]);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.intern}>
        <View style={style.gastoMensal}>
          <Text style={style.txtMain}>Gasto mensal</Text>
          <Text style={style.txtMain}>R$ {totalizador?.totalAtual}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.txtSecond}>{totalizador?.mesAtual}</Text>
          <Text style={style.txtSecond}>R$ {totalizador?.totalAtual}</Text>
        </View>

        <View style={style.gastoMensal}>
          <Text style={style.txtThird}>Mês anterior</Text>
          <Text style={style.txtThird}>R$ {totalizador?.totalAnterior}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.txtSecond}>{totalizador?.mesAnterior}</Text>
          <Text style={style.txtSecond}>R$ {totalizador?.totalAnterior}</Text>
        </View>

        <View style={style.gastoMensal}>
          <Text style={style.txtThird}>Próximo mês</Text>
          <Text style={style.txtThird}>R$ {totalizador?.totalProximo}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.txtSecond}>{totalizador?.proximoMes}</Text>
          <Text style={style.txtSecond}>R$ {totalizador?.totalProximo}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
