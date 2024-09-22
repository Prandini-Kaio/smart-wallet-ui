import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Define types
type Account = {
  id: string;
  name: string;
  balance: number;
};

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
};

// Mock data
const accounts: Account[] = [
  { id: '1', name: 'Checking', balance: 2500 },
  { id: '2', name: 'Savings', balance: 10000 },
];

const transactions: Transaction[] = [
  { id: '1', description: 'Grocery Shopping', amount: -75.50, date: '2024-09-21' },
  { id: '2', description: 'Salary Deposit', amount: 3000, date: '2024-09-20' },
  { id: '3', description: 'Utility Bill', amount: -120, date: '2024-09-19' },
];

const HomeScreen: React.FC = () => {
  const renderAccount = ({ item }: { item: Account }) => (
    <View style={styles.accountItem}>
      <Text style={styles.accountName}>{item.name}</Text>
      <Text style={styles.accountBalance}>${item.balance.toFixed(2)}</Text>
    </View>
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: item.amount >= 0 ? 'green' : 'red' }
      ]}>
        ${Math.abs(item.amount).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Accounts</Text>
      <FlatList
        data={accounts}
        renderItem={renderAccount}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.accountsList}
      />
      
      <Text style={styles.header}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.transactionsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  accountsList: {
    marginBottom: 24,
  },
  accountItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  accountBalance: {
    fontSize: 18,
    color: '#007AFF',
  },
  transactionsList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;