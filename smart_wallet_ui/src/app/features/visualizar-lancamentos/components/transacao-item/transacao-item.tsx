import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { black, gold, gray2, green, lightGray, lightGreen, red, yellow } from "../../../../shared/utils/style-constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TransacaoResponse } from "../../../lancamentos/services/entity/transacao.entity";
import { TipoLancamento, TipoPagamento } from "../../../../shared/services/api/api-context";
import { StatusTransacaoEnum } from "../../services/entity/transacao-entity";

interface Props {
    transacao: TransacaoResponse;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export const TransacaoItem: React.FC<Props> = ({ transacao, isSelected, onSelect }) => {
    const colorStatus = (): string => {
        switch (transacao.status in StatusTransacaoEnum) {
            case transacao.status == StatusTransacaoEnum.ATRASADO:
                return yellow;
            case transacao.status == StatusTransacaoEnum.CANCELADO:
                return red;
            case transacao.status == StatusTransacaoEnum.PAGO:
                return green;
            case transacao.status == StatusTransacaoEnum.PENDENTE:
                return gold;
            default:
                return black;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selectedContainer]}
            onPress={() => onSelect(transacao.id)}
        >
            <View style={styles.iconContainer}>
                <Icon name={transacao.lancamento.icone || 'help-circle'} size={32} color={black} />
                {isSelected && <Icon name="check-circle" size={24} color={green} style={styles.checkIcon} />}
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.mainDescription} numberOfLines={1}>{transacao.lancamento.descricao}</Text>
                <Text style={styles.subDescription} numberOfLines={1}>{transacao.descricao}</Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={[styles.statusText, { color: colorStatus() }]}>{transacao.status}</Text>
                <Text style={styles.dateText}>{transacao.dtVencimento}</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={[
                    styles.valueText,
                    { color: transacao.lancamento.tipoLancamento === TipoLancamento.SAIDA ? red : green }
                ]}>
                    R$ {transacao.valor}
                </Text>
                <Text style={styles.accountText}>{transacao.lancamento.conta}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        borderBottomColor: lightGreen,
        borderBottomWidth: 0.5,
        paddingHorizontal: 10,
    },
    selectedContainer: {
        backgroundColor: gray2,
    },
    iconContainer: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        position: 'absolute',
        top: -5,
        right: -5,
    },
    descriptionContainer: {
        width: '30%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    mainDescription: {
        color: black,
        fontWeight: 'bold',
    },
    subDescription: {
        color: black,
    },
    statusContainer: {
        width: '25%',
        flexDirection: 'column',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 12,
        color: black,
    },
    valueContainer: {
        width: '20%',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    valueText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    accountText: {
        fontSize: 8,
        color: lightGray,
        fontWeight: 'bold',
    },
});