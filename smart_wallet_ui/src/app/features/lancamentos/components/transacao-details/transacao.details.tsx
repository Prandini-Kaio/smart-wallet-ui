import { FlatList, Text, View } from 'react-native';
import { style } from './styles.transacao';
import { TransacaoResponse } from '../../services/entity/transacao.entity';
import { LancamentoResponse } from '../../services/entity/lancamento.entity';
import { gray, green } from '../../../../shared/utils/style-constants';


interface Props {
  lancamento: LancamentoResponse,
  transacoes: TransacaoResponse[]
}

export default function TransacaoDetails(prop: Props) {
  return (
    <>
      <View style={style.container}>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: green, fontSize: 22, fontWeight: 'bold' }}>R$ {prop.lancamento.valor}</Text>
        </View>

        <View style={style.inside}>

          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.txtLabel}>Categoria: </Text>

              <Text style={style.txtSecond}>{prop.lancamento.categoriaLancamento}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={style.txtLabel}>Pagamento: </Text>

              <Text style={style.txtSecond}>{prop.lancamento.tipoPagamento}</Text>
            </View>

          </View>

          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.txtLabel}>Lancamento: </Text>

              <Text style={style.txtSecond}>{prop.lancamento.tipoLancamento}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={style.txtLabel}>Conta: </Text>

              <Text style={style.txtSecond}>{prop.lancamento.conta}</Text>
            </View>

          </View>

        </View >

        <View style={{padding: 10}}>
          <Text style={style.txtSecond}>{prop.lancamento.descricao}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={style.txtThrid}>{prop.lancamento.parcelas}</Text>
          <Text style={style.txtThrid}>{prop.lancamento.status}</Text>
        </View>

      </View >
    </>
  );
}
