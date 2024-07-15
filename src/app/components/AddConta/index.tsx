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
import { lightGreen, red } from '../../shared/styleConstants';

export default function FormAddConta({navigation, visible, hideModal }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const [banco, setBanco] = useState('');
  const [nome, setNome] = useState('');

  const handleSubmit = () => {
    hideModal();
    console.log("TST");
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={style.modalBackground}>
        <View style={style.modalContainer}>
          <Text style={style.label}>Banco</Text>
          <TextInput
            style={style.input}
            placeholder="Enter your name"
            value={banco}
            onChangeText={setBanco}
          />

          <Text style={style.label}>Conta</Text>
          <TextInput
            style={style.input}
            placeholder="Enter your name"
            value={nome}
            onChangeText={setNome}
          />

          <Button title="Submit" onPress={handleSubmit} color={lightGreen}/>
          
          <Button title="Cancelar" onPress={hideModal} color={red}/>
        </View>
      </View>
    </Modal>
  );
}
