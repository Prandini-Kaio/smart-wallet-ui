import {Conta, useAPI} from '../../../../shared/services/api/api-context';
import {
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {style, style2} from './style';
import { useEffect, useState } from 'react';
import { lightGreen } from '../../../../shared/utils/style-constants';

export default function ContasCarousell({navigation}: any) {

  const { getContas } = useAPI();

  const {width: screenWidth} = Dimensions.get('window');

  let [contas, setContas] = useState<Conta[]>();

  useEffect(() => {
    getContas()
    .then((item) => {
      setContas(item);
    });
  })

  // contas = [
  //   {
  //     id: 1,
  //     banco: 'CAIXA',
  //     nome: 'CORRENTE',
  //     dtVencimento : '01/05',
  //     saldoParcial: 120,
  //     tipoConta: TipoConta.CORRENTE_POUPANCA
  //   },
  //   {
  //     id: 2,
  //     banco: 'ITAU',
  //     nome: 'CORRENTE',
  //     dtVencimento: '01/09',
  //     saldoParcial: 120,
  //     tipoConta: TipoConta.ECONOMIA
  //   },
  //   {
  //     id: 3,
  //     banco: 'ITAU',
  //     nome: 'CORRENTE',
  //     dtVencimento: '01/09',
  //     saldoParcial: 120,
  //     tipoConta: TipoConta.INVESTIMENTO
  //   },
  // ];

  console.log("REMOVER COMENTARIOS CARD CONTAS");


function CardContas({nome, banco, dtVencimento, tipoConta}: Conta) {
  return (
    <SafeAreaView style={style2.container}>
      <View style={[style2.card, {backgroundColor: lightGreen}]}>
        <Text style={style2.txtConta}>{banco}</Text>

        <Text style={[style2.txtBold, {alignSelf: 'center'}]}>{tipoConta.toString()}</Text>

        <View
          style={style2.cardFoot}
        >

          <View style={{flexDirection: 'column'}}>
            <Text style={style2.txtBold}>Conta</Text>
            <Text style={style2.txtSmall}>{nome}</Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={style2.txtBold}>Vencimento</Text>
            <Text style={style2.txtSmall}>{dtVencimento}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

  const renderItem = (item: Conta) => {
    return (
      <TouchableOpacity>
        <CardContas
          id={0} 
          saldoParcial={0}
          banco={item.banco}
          nome={item.nome}
          dtVencimento={item.dtVencimento}
          tipoConta={item.tipoConta}        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={contas}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => renderItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
