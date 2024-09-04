import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import style from './style.lancamentos';
import {
  StatusLancamento,
  TipoLancamento,
  TipoPagamento,
  useAPI,
} from '../../../../shared/services/api/api-context';
import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';
import CardTransacao from '../transacao/transacao';
import LancamentoCard from '../lancamento';
import { LancamentoResponse } from '../../services/entity/lancamento.entity';
import { useLancamentoService } from '../../services/lancamentos.service';
import { gray, lightGreen } from '../../../../shared/utils/style-constants';

function mockLancamentos() {
  const lancamentos: LancamentoResponse[] = [];

  for (let i = 1; i <= 5; i++) {
    const lancamento: LancamentoResponse = {
      id: i,
      tipoLancamento:
        Math.random() > 0.5 ? TipoLancamento.ENTRADA : TipoLancamento.SAIDA,
      tipoPagamento:
        Math.random() > 0.5 ? TipoPagamento.DEBITO : TipoPagamento.CREDITO,
      categoriaLancamento: '',
      valor: 0,
      conta: '---',
      dtCriacao: '---',
      parcelas: 0,
      descricao: '---',
      icone: 'leaf',
      status: StatusLancamento.EM_ABERTO,
      dtAlteracaoStatus: '',
    };

    lancamentos.push(lancamento);
  }

  return lancamentos;
}

export default function LancamentosRecentes({ navigation }: any) {
  const focus = useIsFocused();

  const { consultar } = useLancamentoService();

  const [lancamentos, setLancamentos] = useState<LancamentoResponse[]>([]);

  const [lancamento, setLancamento] = useState<LancamentoResponse>();

  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const show = (item: LancamentoResponse) => {
    setVisible(true);
    setLancamento(item);
  };

  useEffect(() => {
    consultar()
      .then((result) => {
        setLancamentos(JSON.parse(result));
      })
      .catch(e => {
        showMessage({
          message: 'Erro ao carregar os lançamentos',
          type: 'danger',
        });
        console.log(e);
      });
  }, [focus]);

  const renderItem = (item: LancamentoResponse) => {
    return (
      <LancamentoCard
        icon={item.icone}
        title={item.descricao}
        date={item.dtCriacao}
        tipoPagamento={item.tipoPagamento}
        tipoLancamento={item.tipoLancamento}
        valor={item.valor}
        parcelas={item.parcelas}
        onPress={() => show(item)}
      />
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.title}>LANCAMENTOS RECENTES</Text>
        <TouchableOpacity onPress={() => navigation.navigate('VisualizarLancamentos')}>
          <Text style={{color: lightGreen, fontWeight: 'bold'}}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={style.list}
        data={lancamentos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />

      <CardTransacao lancamento={lancamento} visible={visible} hide={hide} />
    </SafeAreaView>
  );
}
