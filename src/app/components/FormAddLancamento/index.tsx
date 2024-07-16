import {Button, Modal, ScrollView, Text, TextInput, View} from 'react-native';
import {style} from './style';
import React, {useState} from 'react';
import {Lancamento, TipoLancamento, TipoPagamento, useAPI} from '../../../context/api/api';
import {Picker} from '@react-native-picker/picker';
import {gray, gray2, lightGray} from '../../shared/styleConstants';
import {InputPickerText, InputText} from '../FormInput';
import FlashMessage, { showMessage } from 'react-native-flash-message';

export default function FormAddLancamento({
  navigation,
  visible,
  hideModal,
}: any) 
{

  const { createLancamento } = useAPI();

  const [modalVisible, setModalVisible] = useState(false);

  const [tipoLancamento, setTipoLancamento] = useState(TipoLancamento.ENTRADA);
  const [tipoPagamento, setTipoPagamento] = useState(TipoPagamento.DEBITO);
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [conta, setConta] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [descricao, setDescricao] = useState('');
  const [icone, setIcone] = useState('');

  const criar = () => {
    const lancamento: Lancamento = {
      id: 0,
      tipoLancamento: tipoLancamento,
      tipoPagamento: tipoPagamento,
      categoriaLancamento: categoria,
      valor: parseFloat(valor),
      conta: conta,
      parcelas: parseInt(parcelas),
      descricao: descricao,
      icone: icone,
      dtCriacao: ''
    }

    createLancamento(lancamento);
  }

  const handleSubmit = () => {
    criar();
    hideModal();
  };
  
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={style.modalBackground}>
        <View style={style.modalContainer}>
          <ScrollView>
            <InputPickerText
              label="Tipo de Lançamento"
              selectedValue={tipoLancamento}
              onValueChange={(itemValue: TipoLancamento) =>
                setTipoLancamento(itemValue)
              }
              items={[
                {label: 'Entrada', value: 'ENTRADA'},
                {label: 'Saida', value: 'SAIDA'},
              ]}
            />

            <InputPickerText
              label="Tipo de Pagamento"
              selectedValue={tipoPagamento}
              onValueChange={(itemValue: TipoPagamento) =>
                setTipoPagamento(itemValue)
              }
              items={[
                {label: 'Débito', value: 'DEBITO'},
                {label: 'Crédito', value: 'CREDITO'},
              ]}
            />

            <InputText
              label="Categoria"
              placeholder="Categoria"
              keyboard="default"
              value={categoria}
              onValueChange={setCategoria}
            />

            <View style={style.parInput}>
              <View>
                <InputText
                  label="Valor"
                  placeholder="20.12"
                  keyboard="numeric"
                  value={valor}
                  onValueChange={setValor}
                />
              </View>

              <View>
                <InputText
                  label="Parcelas"
                  placeholder="1"
                  keyboard="numeric"
                  value={parcelas}
                  onValueChange={setParcelas}
                />
              </View>
            </View>

            <InputText
              label="Conta"
              placeholder="Caixa"
              keyboard="default"
              value={conta}
              onValueChange={setConta}
            />

            <InputText
              label="Descrição"
              placeholder="Descrição do lançamento"
              keyboard="default"
              value={descricao}
              onValueChange={setDescricao}
            />
            <Button title="Submit" onPress={handleSubmit} color="lightgreen" />
            <Button title="Cancelar" onPress={hideModal} color="red" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
