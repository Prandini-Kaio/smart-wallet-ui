import {Text, TouchableOpacity, View} from 'react-native';
import style from './style.lancamento';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TipoLancamento} from '../../../shared/services/api/api-context';

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
}: any) {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={style.iconContainer}>
          <Icon style={style.icon} name={icon} />
        </View>

        <View style={style.leftTexts}>
          <Text style={style.baseText}>{title}</Text>
          <Text style={style.alternatText}>{date}</Text>
        </View>
      </View>

      <View style={style.rightTexts}>
        <Text
          style={
            isEntrada(tipoLancamento) ? style.debitText : style.creditText
          }>
          {isEntrada(tipoLancamento) ? '+' : '-'} R$ {valor}
        </Text>

        <Text style={style.alternatText}>{tipoPagamento}</Text>
      </View>
    </TouchableOpacity>
  );
}
