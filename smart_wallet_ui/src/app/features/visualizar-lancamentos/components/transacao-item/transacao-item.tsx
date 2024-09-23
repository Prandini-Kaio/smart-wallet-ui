import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TipoLancamento } from "../../../../shared/services/api/api-context";
import { backgroundColor, black, clearColor, gold, gray2, green, highlightColor, lightBlue, lightGray, pewterBlue, platina, red, secondaryColor, textBlackColor, textLightSecondaryColor, yellow } from "../../../../shared/utils/style-constants";
import { TransacaoResponse } from "../../../lancamentos/services/entity/transacao.entity";
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
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.buttonContainer, isSelected && styles.selectedContainer]}
                onPress={() => onSelect(transacao.id)}
            >
                <View style={styles.iconContainer}>
                    <Icon name={transacao.lancamento.icone || 'help-circle'} size={38} color={black} />
                    {isSelected && <Icon name="check-circle" size={24} color={highlightColor} style={styles.checkIcon} />}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5
    },
    buttonContainer: {
        width: '100%',
        height: 70,
        backgroundColor: backgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: secondaryColor,
        borderBottomWidth: 0.5,
        paddingHorizontal: 10
    },

    selectedContainer: {
        backgroundColor: platina,
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
        color: textBlackColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    subDescription: {
        color: textBlackColor,
        fontSize: 16,
    },
    statusContainer: {
        width: '25%',
        flexDirection: 'column',
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    dateText: {
        color: textBlackColor,
        fontSize: 14,
    },
    valueContainer: {
        width: '20%',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    accountText: {
        fontSize: 10,
        color: textBlackColor,
        fontWeight: 'bold',
    },
});