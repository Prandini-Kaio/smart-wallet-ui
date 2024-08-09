import {FlatList, Modal, SafeAreaView, Text, View} from 'react-native';
import {style} from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {black, lightGreen, white} from '../../shared/styleConstants';
import DetailsInfo from './DetailsInfo';
import {Transacao, useAPI} from '../../../context/api/api';
import TransacaoItem from './Transacao';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';


const Icone = () => {
  return (
    <View style={style.iconeCircle}>
      <Icon name="beach" color={black} size={60} />
    </View>
  );
};

const renderItem = (item: Transacao) => {
  return <TransacaoItem transacao={item} />;
};

export default function CardTransacao({navigation, id, visible, hide}: any) {

  const { getTransacoesByLancamento } = useAPI();

  const [ transacoes, setTransacoes ] = useState<Transacao[]>([]);

  useEffect(() => {

    getTransacoesByLancamento(id)
    .then((result) => {
      setTransacoes(result);
    })
    .catch((e) => {
      showMessage({
          message: "Erro ao carregar transações do lançamento " + id,
          type: "danger"
      })
    })
  })

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={hide}>
      <View style={style.cardBg}>
        <View style={style.card}>
          <Text style={style.txtTitle}>Detalhes</Text>

          <View style={style.infoCard}>
            <Icone />

            <DetailsInfo />

            <FlatList
              data={transacoes}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderItem(item)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
