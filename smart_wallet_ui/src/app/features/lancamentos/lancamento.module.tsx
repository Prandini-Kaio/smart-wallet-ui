import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LancamentoResponse } from '../../features/lancamentos/services/entity/lancamento.entity';
import { useLancamentoService } from '../../features/lancamentos/services/lancamentos.service';
import { formatDate } from '../../features/lancamentos/services/usecases/date-utils.service';
import { Conta, TipoLancamento, TotalizadorFinanceiro, useAPI } from '../../shared/services/api/api-context';
import { handleApiError } from '../../shared/utils/errorHandler';
import { black, gray, gray2, green, lightBlue, pewterBlue, platina, red, richBlack, white } from '../../shared/utils/style-constants';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const { consultar: getLancamentos } = useLancamentoService();
  const { getTotalizadorPeriodo, getContas } = useAPI();
  const isFocused = useIsFocused();

  const [contas, setContas] = useState<Conta[]>([]);
  const [lancamentos, setLancamentos] = useState<LancamentoResponse[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Conta | null>(null);
  const [totalizador, setTotalizador] = useState<TotalizadorFinanceiro>({
    total: 0,
    totalEntrada: 0,
    totalSaida: 0
  });

  const handleAddLancamento = () => {
    navigation.navigate('AddLancamento');
  };

  useEffect(() => {
    try {
      const now = new Date();
      const dayOne = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const dayLast = new Date(now.getFullYear(), now.getMonth() + 2, 0);

      getContas()
        .then((result) => {
          setContas(result);
        });

      getLancamentos()
        .then((result) => {
          setLancamentos(result);
        });

      getTotalizadorPeriodo('', formatDate(dayOne), formatDate(dayLast))
        .then((result) => {
          setTotalizador(result);
        });

    } catch (error) {
      handleApiError(error);
    }
  }, [isFocused]);

  const renderConta = useCallback(({ item }: { item: Conta }) => (
    <TouchableOpacity
      style={[
        styles.accountItem,
        { backgroundColor: item.color },
        selectedAccount?.id === item.id && styles.selectedAccount,
      ]}
      onPress={() => setSelectedAccount(item)}
    >
      <Text style={styles.accountName}>{item.banco}</Text>
      <Text style={styles.accountBalance}>R$ {item.saldoParcial.toFixed(2)}</Text>
    </TouchableOpacity>
  ), [selectedAccount]);

  const renderLancamento = (item: LancamentoResponse) => {
    return (
      <View style={styles.transactionItem}>

        <View style={{ marginRight: 10 }}>
          <Icon name={item.icone} size={36} color={pewterBlue} />
        </View>

        <View style={styles.transactionLeft}>
          <Text style={styles.transactionDescription}>{item.descricao || 'Sem descrição'}</Text>
          <Text style={styles.transactionDate}>{item.dtCriacao || 'Data indisponível'}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={[
            styles.transactionAmount,
            { color: item.tipoLancamento === TipoLancamento.SAIDA ? red : green }
          ]}>
            R$ {item.valor ? item.valor.toFixed(2) : '0.00'}
          </Text>
          <Text style={styles.transactionCategory}>{item.categoriaLancamento || 'Sem categoria'}</Text>
        </View>
      </View>
    );
  };

  const HeaderComponent = useCallback(() => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Finanças</Text>
        <Text style={styles.headerBalance}>R$ {totalizador?.total.toFixed(2)}</Text>
        <Text style={styles.headerSubtitle}>Balanço total</Text>
      </View>
      <View style={styles.balanceBar}>
        {contas.map((conta, index) => {
          const total = totalizador?.total || 1;
          const flexValue = total > 0 ? (conta.saldoParcial ? conta.saldoParcial / total : 0) : 0;
          return (
            <View
              key={conta.id || index}
              style={[
                styles.balanceBarSegment,
                {
                  backgroundColor: conta.color,
                  flex: flexValue
                }
              ]}
            />
          );
        })}
      </View>
      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Minhas contas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Contas')}>
          <Text style={styles.viewAllButton}>Ver detalhes</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contas}
        renderItem={renderConta}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.accountsListContent}
        style={styles.accountsList}
      />
    </View>
  ), [contas, totalizador, renderConta]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />

      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Lançamentos recentes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('VisualizarLancamentos')}>
          <Text style={styles.viewAllButton}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={lancamentos}
        renderItem={({ item }) => renderLancamento(item)}
        keyExtractor={(item) => item.id?.toString()}
        style={styles.transactionsList}
        scrollEnabled={true}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddLancamento}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  headerContainer: {
    backgroundColor: white,
    paddingBottom: 16,
  },
  header: {
    backgroundColor: richBlack,
    padding: 24,
    paddingTop: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
    marginBottom: 8,
  },
  headerBalance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: gray2,
  },
  balanceBar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 20
  },
  balanceBarSegment: {
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    color: black,
  },
  accountsList: {
    marginBottom: 20,
  },
  accountsListContent: {
    paddingHorizontal: 16,
  },
  accountItem: {
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: Dimensions.get('window').width * 0.4, // 40% of screen width
    height: 100,
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedAccount: {
    borderColor: gray,
    borderWidth: 1,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
  viewAllButton: {
    color: lightBlue,
    fontSize: 14,
    fontWeight: '500',
  },
  transactionsList: {
    paddingHorizontal: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: platina,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: richBlack,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: pewterBlue,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: pewterBlue,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: pewterBlue,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen;