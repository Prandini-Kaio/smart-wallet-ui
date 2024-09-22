import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { black, gold, gray, green, lightGreen, red, white } from "../../shared/utils/style-constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TransacaoHeader } from "./components/transacao-header/transacao-header";
import { TransacaoItem } from "./components/transacao-item/transacao-item";
import { TransacaoResponse } from "../lancamentos/services/entity/transacao.entity";
import { useAPI } from "../../shared/services/api/api-context";
import { TransacaoFilter } from "./services/entity/transacao-entity";
import FiltrosLancamento from "./components/lancamentos-filters/lancamentos-filters";

interface APIContextType {
  getTransacoes: (filter: TransacaoFilter) => Promise<TransacaoResponse[]>;
  payTransactions: (ids: number[]) => Promise<void>;
}

export const VisualizarLancamentos: React.FC = () => {
  const { getTransacoes } = useAPI();
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [selectedTransacoes, setSelectedTransacoes] = useState<number[]>([]);
  const [filter, setFilter] = useState<TransacaoFilter>({
    id: 0,
    idLancamento: 0,
    categoria: '',
    tipo: '',
    pagamento: '',
    status: '',
    conta: '',
    dtInicio: '',
    dtFim: ''
  });

  useEffect(() => {
    getTransacoes(filter)
    .then(result => {
      setTransacoes(result);
    });
  }, [filter]);

  const toggleSelection = (id: number) => {
    setSelectedTransacoes(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: TransacaoResponse }) => (
    <TransacaoItem
      transacao={item}
      isSelected={selectedTransacoes.includes(item.id)}
      onSelect={() => toggleSelection(item.id)}
    />
  );

  const handlePaySelected = async () => {
    console.trace("TESTE")
  };

  return (
    <View style={styles.container}>

      <TransacaoHeader filter={filter} />
      <FiltrosLancamento onChangeFilter={setFilter} selectedTransactions={selectedTransacoes}/>

      <View style={styles.listContainer}>
        <SafeAreaView style={styles.flatListContainer}>
          <FlatList
            data={transacoes}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  listContainer: {
    borderTopColor: black,
    borderTopWidth: 0.5,
    borderTopEndRadius: 20,
  },
  flatListContainer: {
    height: '75%',
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: green,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  payButtonText: {
    color: white,
    fontWeight: 'bold',
  },
});