import {useState} from 'react';

export default function Modal({visible, hideModal}: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const [banco, setBanco] = useState('');
  const [nome, setNome] = useState('');

  const handleSubmit = () => {
    hideModal();
    console.log('TST');
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setModalVisible(false)}></Modal>
  );
}
