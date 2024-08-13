import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import {FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import { useEffect, useState } from 'react';
import {Transacao, useAPI} from '../../../../shared/services/api/api-context';
import { black } from '../../../../shared/utils/style-constants';
import {style, style2} from './style.transacao';
import { TransacaoResponse } from '../../services/entity/transacao.entity';
import { TransacaoProps } from '../../services/entity/transacao.entity';
import TransacaoDetails from '../transacao-details/transacao.details';

const Icone = () => {
  return (
    <View style={style.iconeCircle}>
      <Icon name="beach" color={black} size={60} />
    </View>
  );
};

const renderItem = (item: TransacaoResponse) => {
  return <TransacaoItem transacao={item} />;
};

function TransacaoItem (prop: TransacaoProps) {
    return (
      <TouchableOpacity style={style.container}>
        <View style={style2.topOfContainer}>
          <Text style={style2.txtDefault}>{prop.transacao.descricao}</Text>
          <Text style={style2.txtDefault}>R$ {prop.transacao.valor}</Text>
          <Text style={style2.txtYellow}>{prop.transacao.status}</Text>
        </View>
  
        <Text style={style2.txtSecond}>{prop.transacao.dtVencimento}</Text>
      </TouchableOpacity>
    );
  }

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

            <TransacaoDetails />

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
