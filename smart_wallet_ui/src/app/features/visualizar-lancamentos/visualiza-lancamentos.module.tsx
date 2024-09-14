import { FlatList, SafeAreaView, Text, View } from "react-native"
import { black, gold, gray, green, lightGreen, red, white } from "../../shared/utils/style-constants"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { TransacaoHeader } from "./components/transacao-header/transacao-header"
import { TransacaoItem } from "./components/transacao-item/transacao-item"
import { useEffect, useState } from "react"
import { LancamentoResponse } from "../lancamentos/services/entity/lancamento.entity"
import { TransacaoResponse } from "../lancamentos/services/entity/transacao.entity"
import { StatusLancamento, TipoLancamento, TipoPagamento, useAPI } from "../../shared/services/api/api-context"
import { StatusTransacaoEnum, TransacaoFilter } from "./services/entity/transacao-entity"
import { formatDateTime } from "../lancamentos/services/usecases/date-utils.service"

export const VisualizarLancamentos = () => {

    const { getTransacoes } = useAPI();

    const [transacoes, setTransacoes] = useState<TransacaoResponse[]>();


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
        })
        .catch(error => {
            console.error(error);
        })
    }, [filter]);


    const renderItem = (item: TransacaoResponse) => {
        return (
            <TransacaoItem 
                transacao={item}                
            />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: white }}>
            <TransacaoHeader handleChange={setFilter}/>
            <View style={{ borderTopColor: black, borderTopWidth: 0.5, borderTopEndRadius: 20 }}>
                <SafeAreaView style={{ height: '78%', alignItems: 'center' }}>

                    <FlatList 
                        data={transacoes}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => renderItem(item)}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}