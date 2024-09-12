import { SafeAreaView } from 'react-native';
import BalanceCircle from './components/balance/balance';
import {white} from '../../shared/utils/style-constants';
import LancamentosRecentes from './components/lancamentos-list/lancamentos-list';
import {useEffect, useState} from 'react';
import FloatingButton from '../../shared/components/floating-button/floating-button';
import { TotalizadorFinanceiro, useAPI } from '../../shared/services/api/api-context';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';
import { formatDate } from './services/usecases/date-utils.service';
import { handleApiError } from '../../shared/utils/errorHandler';

export default function Lancamento({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const focus = useIsFocused();

  const { getTotalizadorPeriodo } = useAPI();

  const [totalizador, setTotalizador] = useState<TotalizadorFinanceiro>();

  useEffect(() => {
    const now = new Date();
    const dayOne = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const dayLast = new Date(now.getFullYear(), now.getMonth() + 2, 0);

    getTotalizadorPeriodo('', formatDate(dayOne), formatDate(dayLast))
    .then((result) => {
      setTotalizador(result);
    }).catch(error => {
      handleApiError(error);
    });
  }, [focus])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: white}}>
      <BalanceCircle total={totalizador?.total} />
      <LancamentosRecentes navigation={navigation}/>

      <FloatingButton
        onPress={() => navigation.navigate('AddLancamento')}
        icone={'plus'}
      />
    </SafeAreaView>
  );
}
