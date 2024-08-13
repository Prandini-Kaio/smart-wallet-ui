import {SafeAreaView, Text, View} from 'react-native';
import Principal from '../principal';
import BalanceCircle from '../../components/BalanceCircle';
import {white} from '../../shared/styleConstants';
import LancamentosRecentes from '../../components/LancamentosRecentes';
import {useEffect, useState} from 'react';
import FormAddConta from '../../components/FormAddConta';
import FloatingButton from '../../components/FloatingButton';
import FormAddLancamento from '../../components/FormAddLancamento';
import { TotalizadorFinanceiro, useAPI } from '../../../context/api/api';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default function Home({navigation}: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const focus = useIsFocused();

  const { getTotalizadorFinanceiro } = useAPI();

  const [totalizador, setTotalizador] = useState<TotalizadorFinanceiro>();

  useEffect(() => {
    getTotalizadorFinanceiro('', '', '')
    .then((result) => {
      setTotalizador(result);
    })
    .catch((error) => {
      showMessage({
        message: "Erro ao consultar totalizador.",
        type: "danger"
      })
      console.info("Erro ao consultar totalizador.");
    });
  }, [focus])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <BalanceCircle total={totalizador?.total} />
      <LancamentosRecentes />

      <FloatingButton
        onPress={showModal}
        icone={'plus'}
      />

      <FormAddLancamento visible={modalVisible} hideModal={hideModal}/>
    </SafeAreaView>
  );
}
