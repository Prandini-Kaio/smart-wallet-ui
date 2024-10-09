import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Conta, TipoConta } from '../../shared/services/api/api-context';


const ContasScreen: React.FC = ({ route }: any) => {
  const [selectedConta, setSelectedConta] = useState<Conta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { selectedAccount } = route.params;

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  console.log(`AAAAAAAAAA ${selectedAccount}`);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <ContaDetails conta={selectedAccount} />
      </ScrollView>
    </SafeAreaView>
  );
};

const ContaDetails: React.FC<{ conta: Conta }> = ({ conta }) => {
  const getAccountTypeIcon = (tipoConta: TipoConta) => {
    switch (tipoConta) {
      case TipoConta.CORRENTE_POUPANCA:
        return '💳';
      case TipoConta.ECONOMIA:
        return '🐖';
      case TipoConta.INVESTIMENTO:
        return '📈';
      default:
        return '❓';
    }
  };

  return (
    <View>
      <View style={[styles.header, { backgroundColor: conta?.color }]}>
        <Text style={styles.accountTypeIcon}>{getAccountTypeIcon(conta?.tipoConta)}</Text>
        <Text style={styles.bankName}>{conta?.banco}</Text>
        <Text style={styles.accountName}>{conta?.nome}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <DetailItem label="Tipo de Conta" value={conta.tipoConta} />
        <DetailItem label="Saldo Parcial" value={`R$ ${conta.saldoParcial.toFixed(2)}`} />
        <DetailItem label="Data de Vencimento" value={conta.dtVencimento} />
      </View>
    </View>
  );
};

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  contaItem: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contaName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contaBalance: {
    fontSize: 16,
    color: '#666',
  },
  backButton: {
    padding: 10,
    margin: 10,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  accountTypeIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  bankName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  accountName: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
  detailsContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ContasScreen;