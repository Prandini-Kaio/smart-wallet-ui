import {Text, View} from 'react-native';
import {style} from './styles.transacao';

export default function TransacaoDetails() {
  return (
    <>
      <View style={style.container}>
        <View>
          <Text style={style.txtLabel}>Categoria</Text>
          <Text style={style.txtSecond}>LAZER</Text>
        </View>

        <View>
          <Text style={style.txtLabel}>Data Criacao</Text>
          <Text style={style.txtSecond}>01/03/2003</Text>
        </View>

        <View>
          <Text style={style.txtLabel}>Parcelas</Text>
          <Text style={style.txtSecond}>03</Text>
        </View>
      </View>

      <View>
        <Text style={style.txtLabel}>Descricao</Text>
        <Text style={style.txtSecond}>AAAAAAAAAAA</Text>
      </View>
    </>
  );
}
