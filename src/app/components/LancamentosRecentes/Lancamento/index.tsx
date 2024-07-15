import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import style from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TipoLancamento, TipoPagamento } from '../../../../context/api/api';

function isEntrada(tipo: TipoLancamento){
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
      <View style={style.iconContainer}>
        <Icon style={style.icon} name={icon} />
      </View>

      <View style={style.leftTexts}>
        <Text style={style.baseText}>{title}</Text>
        <Text style={style.alternatText}>{date}</Text>
      </View>

      <View style={style.rightTexts}>
        <Text style={isEntrada(tipoLancamento) ? style.debitText : style.creditText}>
            {isEntrada(tipoLancamento) ? '+' : '-'} R$ {valor}
        </Text>

        <Text style={style.alternatText}>
            {tipoLancamento}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
