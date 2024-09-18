import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TotalizadorFinanceiro } from "../../../../shared/services/api/api-context";
import { black, green, red } from "../../../../shared/utils/style-constants";
import { QuadTotalizador } from "../quad-totalizador.tsx/quad-totalizador";
import { TransacaoFilter } from "../../services/entity/transacao-entity";
import { useGetTotalizador } from "../../services/repository/transacao-repository";

interface Props {
    filter: TransacaoFilter;
}

export const TransacaoHeader: React.FC<Props> = ({ filter }) => {

    const { getTotalizador } = useGetTotalizador();

    const [totalizador, setTotalizador] = useState<TotalizadorFinanceiro>({
        total: 0,
        totalEntrada: 0,
        totalSaida: 0
    });

    useEffect(() => {
        getTotalizador(filter)
            .then(result => {
                setTotalizador(result);
            })
            .catch(error => {
                console.log(error);
            });
    }, [filter]);

    return (
        <View style={{ flexDirection: 'row', margin: 15, gap: 12, justifyContent: 'center' }}>

            <QuadTotalizador
                iconName={"chevron-double-up"}
                iconColor={green}
                value={totalizador?.totalEntrada}
            />

            <QuadTotalizador
                iconName={"cash"}
                iconColor={black}
                value={totalizador?.total}
            />

            <QuadTotalizador
                iconName={"chevron-double-down"}
                iconColor={red}
                value={totalizador?.totalSaida}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 150, // Adjust as needed
        marginVertical: 10,
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    pickerContainer: {
        width: 150, // Adjust based on your CustomPicker width
        marginHorizontal: 5,
    },
});