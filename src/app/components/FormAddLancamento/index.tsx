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
import { TipoLancamento, TipoPagamento } from '../../../context/api/api';
  
  export default function FormAddLancamento({navigation, visible, hideModal }: any) {
    const [modalVisible, setModalVisible] = useState(false);
  
    const [tipoLancamento, setTipoLancamento] = useState(TipoLancamento.ENTRADA);
    const [tipoPagamento, setTipoPagamento] = useState(TipoPagamento.DEBITO);
    const [categoria, setCategoria] = useState("");
    const [valor, setValor] = useState(0.00);
    const [conta, setConta] = useState("");
    const [parcelas, setParcelas] = useState(1);
    const [descricao, setDescricao] = useState("");
    const [icone, setIcone] = useState("");
  
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
  