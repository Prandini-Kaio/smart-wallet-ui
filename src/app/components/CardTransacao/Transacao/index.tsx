import {Text, TouchableOpacity, View} from 'react-native';
import {Transacao} from '../../../../context/api/api';
import {style} from './style';

interface Props {
  transacao: Transacao;
}

export default function TransacaoItem(props: Props) {
  return (
    <TouchableOpacity style={style.container}>
      <View style={style.topOfContainer}>
        <Text style={style.txtDefault}>{props.transacao.descricao}</Text>
        <Text style={style.txtDefault}>R$ {props.transacao.valor}</Text>
        <Text style={style.txtYellow}>{props.transacao.status}</Text>
      </View>

      <Text style={style.txtSecond}>{props.transacao.dtVencimento}</Text>
    </TouchableOpacity>
  );
}
