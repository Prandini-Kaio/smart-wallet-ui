import { SafeAreaView } from 'react-native';
import BalanceCircle from './components/balance/balance';
import {white} from '../../shared/utils/style-constants';
import LancamentosRecentes from './components/lancamentos-list/lancamentos-list';
import {useEffect, useState} from 'react';
import FloatingButton from '../../shared/components/floating-button/floating-button';
import FormAddLancamento from './components/form-lancamento/form-lancamento';
import { TotalizadorFinanceiro, useAPI } from '../../shared/services/api/api-context';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';

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
