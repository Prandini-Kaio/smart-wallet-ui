import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Transacao, useAPI } from '../../../../shared/services/api/api-context';
import { black, gray } from '../../../../shared/utils/style-constants';
import { style, style2 } from './style.transacao';
import { TransacaoResponse } from '../../services/entity/transacao.entity';
import { TransacaoProps } from '../../services/entity/transacao.entity';
import TransacaoDetails from '../transacao-details/transacao.details';
import { LancamentoResponse } from '../../services/entity/lancamento.entity.tsx';

const Icone = ({ nome }: { nome: string }) => {
  return (
    <View style={style.iconeCircle}>
      <Icon name={nome} color={black} size={60} />
    </View>
  );
};

const TransacaoItem = ({ transacao }: { transacao: TransacaoProps['transacao'] }) => {
  
  const [dia, mes, ano] = transacao.dtVencimento.split("/").map(Number);
  const dt = new Date(ano, mes -1, dia);

  const formatData = (data: Date) => {
    const dia = String(data.getDay()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');

    return `${dia}/${mes}`
  }
  
  return (
    <TouchableOpacity style={style2.container}>
      <Text style={style2.txtDefault}>{transacao.descricao}</Text>
      <Text style={style2.txtDefault}>R$ {transacao.valor}</Text>
      <Text style={style2.txtYellow}>{transacao.status}</Text>
      <Text style={style2.txtSecond}>{formatData(dt)}</Text>
    </TouchableOpacity>
  );
};

interface Props {
  lancamento: LancamentoResponse | undefined;
  visible: boolean;
  hide: () => void;
}

export default function CardTransacao({ lancamento, visible, hide }: Props) {
  const { getTransacoesByLancamento } = useAPI();
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);

  useEffect(() => {
    if (lancamento) {
      getTransacoesByLancamento(lancamento.id)
        .then(result => {
          setTransacoes(result);
        })
        .catch(e => {
          showMessage({
            message: `Erro ao carregar transações do lançamento ${lancamento.id}`,
            type: 'danger',
          });
        });
    }
  }, [lancamento, getTransacoesByLancamento]);

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
            <Icone nome={lancamento ? lancamento.icone : 'beach'} />

            <TransacaoDetails transacoes={transacoes} lancamento={lancamento} />

            <View style={{ }}>
              <FlatList
                data={transacoes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <TransacaoItem transacao={item} />}
              />
            </View>

          </View>
        </View>
      </View>
    </Modal>
  );
}