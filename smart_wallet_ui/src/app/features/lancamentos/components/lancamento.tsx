import { Text, TouchableOpacity, View } from 'react-native';
import style from './style.lancamento';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TipoLancamento } from '../../../shared/services/api/api-context';
import { green, red } from '../../../shared/utils/style-constants';

function isEntrada(tipo: TipoLancamento) {
  return tipo == TipoLancamento.ENTRADA;
}

export default function LancamentoCard({
  navigation,
  onPress,
  icon,
  title,
  date,
  tipoPagamento,
  tipoLancamento,
  valor,
  parcelas
}: any) {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={style.iconContainer}>
          <Icon style={style.icon} name={icon} />
        </View>

        <View style={style.leftTexts}>
          <Text style={style.baseText}>{title}</Text>
          <Text style={style.alternatText}>{date}</Text>
        </View>
      </View>

      <View style={style.rightTexts}>
        <View style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <Text
            style={{...style.moneyTxt, color: tipoLancamento == TipoLancamento.ENTRADA ? green : red}}>
            {isEntrada(tipoLancamento) ? '+' : '-'} R$ {valor}
          </Text>
          <Text style={{fontSize: 10}}>/{parcelas}</Text>
        </View>

        <Text style={style.alternatText}>{tipoPagamento}</Text>
      </View>
    </TouchableOpacity>
  );
}
