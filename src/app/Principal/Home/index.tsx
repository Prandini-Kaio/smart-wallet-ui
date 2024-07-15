import {SafeAreaView, Text, View} from 'react-native';
import Principal from '../principal';
import BalanceCircle from '../../components/BalanceCircle';
import {white} from '../../shared/styleConstants';
import LancamentosRecentes from '../../components/LancamentosRecentes';
import {useState} from 'react';
import FormAddConta from '../../components/AddConta';
import FloatingButton from '../../components/FloatingButton';

export default function Home({navigation}: any) {
  const [modalVisible, setModalVisible] = useState(true);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <BalanceCircle total={123.2} />
      <LancamentosRecentes />

      <FloatingButton
        onPress={showModal}
        icone={'plus'}
      />

      <FormAddConta visible={modalVisible} hideModal={hideModal}/>
    </SafeAreaView>
  );
}
