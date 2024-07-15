import { FlatList, SafeAreaView, Text } from "react-native";
import style from "./style";
import { Lancamento, TipoLancamento, TipoPagamento, useAPI } from "../../../context/api/api";
import LancamentoCard from "./Lancamento";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";

function mockLancamentos(){
    const lancamentos: Lancamento[] = [];
    
    for (let i = 1; i <= 10; i++) {
        const lancamento: Lancamento = {
            id: i,
            tipoLancamento: Math.random() > 0.5 ? TipoLancamento.ENTRADA : TipoLancamento.SAIDA,
            tipoPagamento: Math.random() > 0.5 ? TipoPagamento.DEBITO : TipoPagamento.CREDITO,
            categoriaLancamento: '',
            valor: 0,
            conta: '---',
            dtCriacao: '---',
            parcelas: 0,
            descricao: '---',
            icone: 'leaf'
        };
        lancamentos.push(lancamento);
    }
    
    return lancamentos;
}

export default function LancamentosRecentes({ navigation }: any){

    const { getLancamentos } = useAPI();

    const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

    useEffect(() => {

        setLancamentos(mockLancamentos());
        
        getLancamentos()
        .then((result) => {
            setLancamentos(result.content);
            showMessage({
                message: "Erro ao carregar os lançamentos",
                type: "danger"
            })
            if(result.content == null)
                setLancamentos(mockLancamentos());
        })
        .catch((e) => {
            showMessage({
                message: "Erro ao carregar os lançamentos",
                type: "danger"
            })
        })
    }, [])

    const renderItem = (item: Lancamento) => {
        return (
            <LancamentoCard
                icon={item.icone}
                title={item.categoriaLancamento}
                date={item.dtCriacao}
                tipoPagamento={item.tipoPagamento}
                tipoLancamento={item.tipoLancamento}
                valor={item.valor}
            ></LancamentoCard>
        )
    }

    return (
        <SafeAreaView 
            style={style.container}
        >
            <Text style={style.title}>LANCAMENTOS RECENTES</Text>

            <FlatList 
                style={style.list}
                data={lancamentos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderItem(item)}
            />
        </SafeAreaView>
    )
}