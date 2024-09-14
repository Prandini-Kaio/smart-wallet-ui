import { View, Text, TouchableOpacity } from "react-native"
import { black, gold, green, lightGray, lightGreen, red, yellow } from "../../../../shared/utils/style-constants"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { TransacaoResponse } from "../../../lancamentos/services/entity/transacao.entity";
import { TipoLancamento, TipoPagamento } from "../../../../shared/services/api/api-context";
import { StatusTransacaoEnum } from "../../services/entity/transacao-entity";


interface Props {
    transacao: TransacaoResponse;
}

export const TransacaoItem = (props: Props) => {

    const colorStatus = () => {
        switch (StatusTransacaoEnum[props.transacao.status as unknown as keyof typeof StatusTransacaoEnum]) {
            case StatusTransacaoEnum.ATRASADO:
                return yellow;
            case StatusTransacaoEnum.CANCELADO:
                return red;
            case StatusTransacaoEnum.PAGO:
                return green;
            case StatusTransacaoEnum.PENDENTE:
                return gold;
            default:
                return black;
        }
    }

    return (
        <TouchableOpacity style={{
            width: '95%',
            height: 65,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 20,
            borderBottomColor: lightGreen,
            borderBottomWidth: 0.5
        }}
        >
            <Icon name={props.transacao != null ? props.transacao.lancamento.icone : 'unknown'} size={32} color={black} />

            <View style={{ width: '30%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: black, fontWeight: 'bold' }} numberOfLines={1}> {props.transacao.lancamento.descricao}</Text>
                <Text style={{ color: black }} numberOfLines={1}> {props.transacao.descricao}</Text>
            </View>

            <View style={{ width: '25%', flexDirection: 'column' }}>
                <Text style={{ fontSize: 12, color: colorStatus(), fontWeight: 'bold' }}>{props.transacao.status}</Text>
                <Text style={{ fontSize: 12, color: black }}>{props.transacao.dtVencimento}</Text>
            </View>

            <View style={{ width: '20%', flexDirection: 'column' }}>
                <Text style={{
                    width: 80,
                    fontSize: 15,
                    color: props.transacao.lancamento.tipoLancamento == TipoLancamento.SAIDA ? red : green,
                    fontWeight: 'bold',
                    textAlign: 'left'
                }}
                >
                    R$ {props.transacao.valor}
                </Text>
                <Text style={{ fontSize: 8, color: lightGray, fontWeight: 'bold' }}>{props.transacao.lancamento.conta}</Text>
            </View>
        </TouchableOpacity>
    )
}