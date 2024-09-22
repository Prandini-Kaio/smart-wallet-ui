import {
  Button,
  Modal,
  Text,
  TextInput,
  View,
} from 'react-native';
import { style } from './style';
import { useState } from 'react';
import { gray2, lightGreen, red } from '../../../../shared/utils/style-constants';
import { Conta, TipoConta, useAPI } from '../../../../shared/services/api/api-context';
import { InputPickerText } from '../../../../shared/components/input-form/input-form';

export default function FormAddConta({ navigation, visible, hideModal }: any) {
  const { createConta } = useAPI();

  const [modalVisible, setModalVisible] = useState(false);

  const [banco, setBanco] = useState('');
  const [nome, setNome] = useState('');
  const [dtVencimento, setDtVencimento] = useState('');
  const [diaVencimento, setDiaVencimento] = useState('');
  const [tipoConta, setTipoConta] = useState(TipoConta.CORRENTE_POUPANCA);

  const criar = () => {
    const conta: Conta = {
      id: 0,
      nome: nome,
      banco: banco,
      dtVencimento: dtVencimento,
      diaVencimento: diaVencimento,
      saldoParcial: 0,
      tipoConta: tipoConta,
      color: ''
    }

    createConta(conta);
  }

  const handleSubmit = () => {
    hideModal();
    criar();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={style.modalBackground}>
        <View style={style.modalContainer}>


          <InputPickerText
            label="Tipo de Pagamento"
            selectedValue={tipoConta}
            onValueChange={(itemValue: TipoConta) =>
              setTipoConta(itemValue)
            }
            items={[
              { label: 'Corrente/Poupança', value: 'CORRENTE_POUPANCA' },
              { label: 'Economia', value: 'ECONOMIA' },
              { label: 'Investimento', value: 'INVESTIMENTO' }
            ]}
          />


          <Text style={style.label}>Banco</Text>

          <TextInput
            style={style.input}
            placeholderTextColor={gray2}
            placeholder="Caixa"
            value={banco}
            onChangeText={setBanco}
          />

          <Text style={style.label}>Conta</Text>

          <TextInput
            style={style.input}
            placeholderTextColor={gray2}
            placeholder="Poupanca"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={style.input}
            placeholderTextColor={gray2}
            placeholder="01"
            value={diaVencimento}
            onChangeText={setDiaVencimento}
          />

          <Button title="Submit" onPress={handleSubmit} color={lightGreen} />

          <Button title="Cancelar" onPress={hideModal} color={red} />
        </View>
      </View>
    </Modal>
  );
}
