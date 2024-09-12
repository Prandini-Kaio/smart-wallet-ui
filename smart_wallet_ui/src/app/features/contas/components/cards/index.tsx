import {Conta, TipoConta, useAPI} from '../../../../shared/services/api/api-context';
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
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';


function mockContas(){
  
  const contas: Conta[] = [];

  for (let i = 1; i <= 5; i++) {
      const conta: Conta = {
        id: 1,
        banco: 'CAIXA',
        nome: 'CORRENTE',
        dtVencimento : '01/05',
        diaVencimento: '1',
        saldoParcial: 120,
        tipoConta: TipoConta.CORRENTE_POUPANCA
      };

      contas.push(conta);
  }
  
  return contas;
}



export default function ContasCarousell({navigation}: any) {

  const { getContas } = useAPI();
  const focus = useIsFocused();

  const [contas, setContas] = useState<Conta[]>([]);

  useEffect(() => {
        
    getContas()
    .then((result) => {
        setContas(result);
    })
    .catch((e) => {
        showMessage({
            message: "Erro ao carregar as contas",
            type: "danger"
        })
        console.info("Erro ao consultar contas");
    })
}, [focus])

function CardContas({nome, banco, dtVencimento, tipoConta, saldoParcial}: Conta) {
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
            <Text style={style2.txtBold}>R$</Text>
            <Text style={style2.txtBold}>{saldoParcial}</Text>
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
          id={item.id} 
          saldoParcial={item.saldoParcial}
          banco={item.banco}
          nome={item.nome}
          dtVencimento={item.dtVencimento}
          diaVencimento={item.diaVencimento}
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
