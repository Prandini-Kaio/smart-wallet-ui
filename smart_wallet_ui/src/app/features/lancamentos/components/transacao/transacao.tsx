import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAPI } from '../../../../shared/services/api/api-context';
import { black, green, yellow } from '../../../../shared/utils/style-constants';
import { StatusTransacaoEnum, TransacaoFilter } from '../../../visualizar-lancamentos/services/entity/transacao-entity';
import { LancamentoResponse } from '../../services/entity/lancamento.entity';
import { TransacaoProps, TransacaoResponse } from '../../services/entity/transacao.entity';
import ConfirmTransactionComponent from '../confirm-pay-modal/confirm-pay-modal';
import TransacaoDetails from '../transacao-details/transacao.details';
import { style, style2 } from './style.transacao';

const Icone = ({ nome }: { nome: string }) => (
  <View style={style.iconeCircle}>
    <Icon name={nome} color={black} size={60} />
  </View>
);

const TransacaoItem = ({ transacao, onPress }: TransacaoProps) => {
  const [dia, mes, ano] = transacao.dtVencimento.split('/').map(Number);
  const dt = new Date(ano, mes - 1, dia);

  const formatData = (data: Date) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
  };

  return (
    <TouchableOpacity style={style2.container} onPress={onPress}>
      <Text style={style2.txtDefault}>{transacao.descricao}</Text>
      <Text style={style2.txtDefault}>R$ {transacao.valor}</Text>
      <Text style={
        {
          ...style2.txtYellow,
          color: transacao.status === StatusTransacaoEnum.PENDENTE ? yellow : green 
        }
      }
      >{transacao.status}</Text>
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
  const { getTransacoes, payTransaction } = useAPI();
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState('');
  const [descricao, setDescricao] = useState('SEM DESCRIÇÃO DISPONÍVEL');

  // Função para resetar o estado do modal
  const resetModal = useCallback(() => {
    setIsModalVisible(false);
    setCurrentTransactionId('');
    setDescricao('SEM DESCRIÇÃO DISPONÍVEL');
    hide();
  }, [hide]);

  const handlePressPayNow = useCallback((transacao: TransacaoResponse) => {
    setIsModalVisible(true);
    setCurrentTransactionId(transacao.id.toString());
    setDescricao(transacao.descricao);
  }, []);

  const handleConfirm = useCallback(() => {
    console.log(currentTransactionId)
    if (currentTransactionId) {
      payTransaction(currentTransactionId)
        .then(result => {
          resetModal();
        });
    }
  }, [currentTransactionId, payTransaction, resetModal]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  useEffect(() => {
    if (lancamento) {
      const filter: TransacaoFilter = {
        id: null,
        idLancamento: lancamento.id,
        categoria: '',
        tipo: '',
        pagamento: '',
        status: '',
        conta: '',
        dtInicio: '',
        dtFim: '',
      };

      getTransacoes(filter)
        .then(result => setTransacoes(result))
        .catch(() => {
          showMessage({
            message: `Erro ao carregar transações do lançamento ${lancamento.id}`,
            type: 'danger',
          });
        });
    }
  }, [lancamento, getTransacoes, resetModal]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={hide}>
      <View style={style.cardBg}>
        <View style={style.card}>
          <Text style={style.txtTitle}>Detalhes</Text>
          <View style={style.infoCard}>
            <Icone nome={lancamento ? lancamento.icone : 'beach'} />

            <TransacaoDetails transacoes={transacoes} lancamento={lancamento} />

            <FlatList
              data={transacoes}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TransacaoItem transacao={item} onPress={() => handlePressPayNow(item)} />
              )}
            />

            <ConfirmTransactionComponent
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              isModalVisible={isModalVisible}
              descricao={descricao}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
