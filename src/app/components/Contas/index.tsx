import {Conta} from '../../../context/api/api';
import {
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {style} from './style';
import { black, green, purple } from '../../shared/styleConstants';
import CardContas from './CardContas';

export default function ContasCarousell({navigation}: any) {
  const {width: screenWidth} = Dimensions.get('window');

  const contas: Conta[] = [
    {
      id: 1,
      banco: 'CAIXA',
      conta: 'CORRENTE',
      vencimento: '01/05',
      color: green
    },
    {
      id: 2,
      banco: 'ITAU',
      conta: 'CORRENTE',
      vencimento: '01/09',
      color: purple
    },
    {
      id: 3,
      banco: 'ITAU',
      conta: 'CORRENTE',
      vencimento: '01/09',
      color: black
    },
  ];

  const renderItem = (item: Conta) => {
    return (
      <TouchableOpacity>
        <CardContas
          conta={item.conta}
          banco={item.banco}
          vencimento={item.vencimento}
          color={item.color}
        />
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
