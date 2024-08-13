import { FlatList, SafeAreaView, Text } from "react-native";
import style from "./style.lancamentos";
import { Lancamento, StatusLancamento, TipoLancamento, TipoPagamento, useAPI } from "../../../../shared/services/api/api-context";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";
import CardTransacao from "../transacao/transacao";
import LancamentoCard from "../lancamento";

function mockLancamentos(){
    const lancamentos: Lancamento[] = [];
    
    for (let i = 1; i <= 5; i++) {
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
            icone: 'leaf',
            status: StatusLancamento.EM_ABERTO,
            dtAlteracaoStatus: ""
        };

        lancamentos.push(lancamento);
    }
    
    return lancamentos;
}

export default function LancamentosRecentes({ navigation }: any){

    const focus = useIsFocused();

    const { getLancamentos } = useAPI();

    const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

    const [idLancamento, setIdLancamento] = useState(0);

    const [visible, setVisible] = useState(false);

    const hide = () => {
      setVisible(false);
    }
  
    const show = (id: number) => {
      setVisible(true);
      setIdLancamento(id)
    }

    useEffect(() => {
        
        getLancamentos()
        .then((result) => {
            setLancamentos(result);
            if(result === null)
                setLancamentos(mockLancamentos());
        })
        .catch((e) => {
            showMessage({
                message: "Erro ao carregar os lançamentos",
                type: "danger"
            })
            setLancamentos(mockLancamentos());
            console.info("Erro ao consultar lançamentos");
        })
    }, [focus])

    const renderItem = (item: Lancamento) => {
        return (
            <LancamentoCard
                icon={item.icone}
                title={item.categoriaLancamento}
                date={item.dtCriacao}
                tipoPagamento={item.tipoPagamento}
                tipoLancamento={item.tipoLancamento}
                valor={item.valor}
                onPress={() => show(item.id)}
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

            <CardTransacao id={idLancamento} visible={visible} hide={hide}/>
        </SafeAreaView>
    )
}