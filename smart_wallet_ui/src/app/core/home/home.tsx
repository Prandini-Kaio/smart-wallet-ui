import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { black, blueDianne, gray, gray2, porsche, purple, redDamask, seaBuckthorn, white } from '../../shared/utils/style-constants';
import { Conta, Transacao } from '../../shared/services/api/api-context';
import { useContaService } from '../../features/contas/services/contas.service';
import { useLancamentoService } from '../../features/lancamentos/services/lancamentos.service';

// Define types
type Account = {
  id: string;
  name: string;
  balance: number;
  color: string;
};

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
};

// Mock data

const HomeScreen: React.FC = () => {
  
  const { consultarContas } = useContaService();
  const { consultar: consultarLancamentos } = useLancamentoService();
  
  const [accounts, setAccounts] = useState<Conta[]>([]);
  const [transactions, setTransactions] = useState<Transacao[]>([]);

  const [selectedAccount, setSelectedAccount] = useState<Conta>(accounts[0]);

  const totalBalance = accounts.reduce((sum, account) => sum + account.saldoParcial, 0);

  useEffect(() => {
    consultarContas()
    .then((result) => {
      setAccounts(result);
    });

    consultarLancamentos()
    .then((result) => {
      setTransactions(result);
    });

  });

  const renderAccount = ({ item }: { item: Conta }) => (
    <TouchableOpacity
      style={[
        styles.accountItem,
        { backgroundColor: item.color },
        selectedAccount.id === item.id && styles.selectedAccount,
      ]}
      onPress={() => setSelectedAccount(item)}
    >
      <Text style={styles.accountName}>{item.banco}</Text>
      <Text style={styles.accountBalance}>R$ {item.saldoParcial.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          { color: item.amount >= 0 ? '#4ECDC4' : '#FF6B6B' }
        ]}>
          R$ {Math.abs(item.amount).toFixed(2)}
        </Text>
        <Text style={styles.transactionCategory}>{item.category}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Finanças</Text>
        <Text style={styles.headerBalance}>R$ {totalBalance.toFixed(2)}</Text>
        <Text style={styles.headerSubtitle}>Balanço total</Text>
      </View>

      <View style={styles.balanceBar}>
        {accounts.map((account) => (
          <View 
            key={account.id} 
            style={[
              styles.balanceBarSegment, 
              { 
                backgroundColor: account.color,
                flex: account.saldoParcial / totalBalance
              }
            ]} 
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Minhas contas</Text>
      <FlatList
        data={accounts}
        renderItem={renderAccount}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.accountsList}
      />
      
      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Lançamentos recentes</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllButton}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.transactionsList}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  header: {
    backgroundColor: blueDianne,
    padding: 24,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    height: 20,
    marginTop: 16,
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
    paddingHorizontal: 16,
  },
  accountItem: {
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 150,
    shadowColor: gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAccount: {
    borderColor: gray,
    borderWidth: 1,
  },
  accountName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: white,
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
  viewAllButton: {
    color: '#FBAE54',
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
    backgroundColor: '#d8ebe8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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
    color: '#2A2D3E',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#888888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#888888',
  },
});

export default HomeScreen;