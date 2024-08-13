import {Conta, TipoConta, useAPI} from '../../../context/api/api';
import {
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {style} from './style';
import CardContas from './CardContas';
import { useEffect, useState } from 'react';

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
