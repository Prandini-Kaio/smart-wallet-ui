import {
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {style} from './style';
import {useState} from 'react';
import { gray, gray2, lightGray, lightGreen, red } from '../../shared/styleConstants';
import { Conta, TipoConta, useAPI } from '../../../context/api/api';
import { InputPickerText } from '../FormInput';

export default function FormAddConta({navigation, visible, hideModal }: any) {
  const { createConta } = useAPI();
  
  const [modalVisible, setModalVisible] = useState(false);

  const [banco, setBanco] = useState('');
  const [nome, setNome] = useState('');
  const [dtVencimento, setDtVencimento] = useState('');
  const [tipoConta, setTipoConta] = useState(TipoConta.CORRENTE_POUPANCA);

  const criar =() => {
    const conta: Conta = {
      id: 0,
      nome: nome,
      banco: banco,
      dtVencimento: dtVencimento,
      saldoParcial: 0,
      tipoConta: tipoConta
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
                {label: 'Corrente/Poupança', value: 'CORRENTE_POUPANCA'},
                {label: 'Economia', value: 'ECONOMIA'},
                {label: 'Investimento', value: 'INVESTIMENTO'}
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

          <Text style={style.label}>Vencimento</Text>

          <TextInput
            style={style.input}
            placeholderTextColor={gray2}
            placeholder="21/12"
            value={dtVencimento}
            onChangeText={setDtVencimento}
          />

          <Button title="Submit" onPress={handleSubmit} color={lightGreen}/>
          
          <Button title="Cancelar" onPress={hideModal} color={red}/>
        </View>
      </View>
    </Modal>
  );
}
