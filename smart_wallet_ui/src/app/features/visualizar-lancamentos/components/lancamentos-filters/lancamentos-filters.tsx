import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Conta, TipoLancamento, useAPI } from "../../../../shared/services/api/api-context";
import { black, gold, white } from "../../../../shared/utils/style-constants";
import { useContaService } from "../../../contas/services/contas.service";
import { useLancamentoService } from "../../../lancamentos/services/lancamentos.service";
import { formatDateTimeFimDia } from "../../../lancamentos/services/usecases/date-utils.service";
import { TransacaoFilter } from "../../services/entity/transacao-entity";
import DatePickerCustom from "../filter-picker/date-picker";
import CustomPicker, { PickerOption } from "../filter-picker/picker";
import PaymentPicker from "../payment-picker/payment-picker";
import DatePicker from "react-native-date-picker";
import { showMessage } from "react-native-flash-message";

const FiltrosLancamento = ({onChangeFilter, selectedTransactions}: any) => {

    const focus = useIsFocused();

    const today = new Date();

    const { consultarCategorias } = useLancamentoService();
    const { consultarContas } = useContaService();
    const { payAllTransactions, payTransaction } = useAPI();

    const [dtInicioOpen, setDtInicioOpen] = useState(false);
    const [dtInicio, setDtInicio] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const [dtFimOpen, setDtFimOpen] = useState(false);
    const [dtFim, setDtFim] = useState(new Date(today.getFullYear(), today.getMonth() + 2, 0));

    const [tipo, setTipo] = useState('');
    const [tipoItemsPicker, setTipoItemsPicker] = useState<PickerOption[]>([
        { label: '...', value: '' },
        { label: 'Entrada', value: 'ENTRADA' },
        { label: 'Saida', value: 'SAIDA' }
    ]);

    const [categoria, setCategoria] = useState('');
    const [categoriaItemsPicker, setCategoriaItemsPicker] = useState<PickerOption[]>([]);

    const [tipoPagamento, setTipoPagamento] = useState('');
    const [tipoPagamentoItemsPicker, setTipoPagamentoItemsPicker] = useState<PickerOption[]>([
        { label: '...', value: '' },
        { label: 'Crédito', value: 'CREDITO' },
        { label: 'Débito', value: 'DEBITO' }
    ]);

    const [status, setStatus] = useState('')
    const [statusItemsPicker, setStatusItemsPicker] = useState<PickerOption[]>([
        { label: '...', value: '' },
        { label: 'Atrasado', value: 'ATRASADO' },
        { label: 'Cancelado', value: 'CANCELADO' },
        { label: 'Pago', value: 'PAGO' },
        { label: 'Pendente', value: 'PENDENTE' }
    ]);

    const [conta, setConta] = useState('');
    const [contasItemsPicker, setContasItemsPicker] = useState<PickerOption[]>([]);

    const [filter, setFilter] = useState<TransacaoFilter>();

    const filtroVazio: TransacaoFilter = {
        id: null,
        idLancamento: null,
        tipo: tipo != '' ? TipoLancamento[tipo as keyof typeof TipoLancamento] : '',
        categoria: categoria,
        pagamento: tipoPagamento,
        status: status,
        dtInicio: formatDateTimeFimDia(dtInicio, false),
        dtFim: formatDateTimeFimDia(dtFim, true),
        conta: conta,
    }

    function montarFiltro(){
        const filtro: TransacaoFilter = {
            id: null,
            idLancamento: null,
            tipo: tipo != '' ? TipoLancamento[tipo as keyof typeof TipoLancamento] : '',
            categoria: categoria,
            pagamento: tipoPagamento,
            status: status,
            dtInicio: formatDateTimeFimDia(dtInicio, false),
            dtFim: formatDateTimeFimDia(dtFim, true),
            conta: conta,
        }

        return filtro;
    } 


    const handleFind = () => {
        const filtro = montarFiltro();

        setFilter(filtro);
        onChangeFilter(filtro);
    }

    const handlePayAll = () => {
        const filtro : TransacaoFilter = montarFiltro() || filtroVazio;

        payAllTransactions(filtro)
        .then((result) => {
            showMessage({
                message: "Todas as transações foram pagas",
                type: 'success',
                duration: 3000,
            });
        });
    }

    const handlePaySelected = () => {
        const filtro : TransacaoFilter = montarFiltro() || filtroVazio;

        payTransaction(selectedTransactions)
        .then((result) => {
            showMessage({
                message: "Todas as transações foram pagas",
                type: 'success',
                duration: 3000,
            });
        });
    }

    useEffect(() => {
        consultarCategorias()
            .then((result) => {
                const resultado: string[] = JSON.parse(result);

                const categoriasItems: PickerOption[] = resultado.map(categoria => {
                    return {
                        label: categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase(),
                        value: categoria
                    };
                });
                setCategoriaItemsPicker([
                    { label: '...', value: '' },
                    ...categoriasItems]);
            }).catch((error) => {
                console.error(error);
            });

        consultarContas().then((result) => {
            const resultado: Conta[] = JSON.parse(result);
            const contaItems: PickerOption[] = resultado.flat().map(conta => {
                return {
                    label: conta.banco.charAt(0).toUpperCase() + conta.banco.slice(1).toLowerCase(),
                    value: conta.banco
                };
            });
            setContasItemsPicker([
                { label: '...', value: '' },
                ...contaItems
            ]);
        })
    }, [focus]);

    useEffect(() => {
        handleFind();
    }, [categoria, tipo, tipoPagamento, status, conta, dtInicio, dtFim])

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator
                contentContainerStyle={styles.scrollViewContent}
            >
                <CustomPicker
                    label="Categoria"
                    options={categoriaItemsPicker}
                    selectedValue={categoria}
                    onValueChange={(cat) => {
                        setCategoria(cat);
                    }}
                />
                <CustomPicker
                    label="Tipo"
                    options={tipoItemsPicker}
                    selectedValue={tipo}
                    onValueChange={(tipo) => {
                        setTipo(tipo);
                    }}
                />
                <CustomPicker
                    label="Pagamento"
                    options={tipoPagamentoItemsPicker}
                    selectedValue={tipoPagamento}
                    onValueChange={(pagamento) => {
                        setTipoPagamento(pagamento);
                    }}
                />
                <CustomPicker
                    label="Status"
                    options={statusItemsPicker}
                    selectedValue={status}
                    onValueChange={(status) => {
                        setStatus(status);
                    }}
                />
                <CustomPicker
                    label="Conta"
                    options={contasItemsPicker}
                    selectedValue={conta}
                    onValueChange={(conta) => {
                        setConta(conta);
                    }}
                />
            </ScrollView>

            <View style={styles.datePickerContainer}>
                <DatePickerCustom
                    setDtInicioOpen={() => setDtInicioOpen(true)}
                    date={dtInicio}
                />
                <DatePickerCustom
                    setDtInicioOpen={() => setDtFimOpen(true)}
                    date={dtFim}
                />
            </View>

            <View style={styles.actionContainer}>
                <View style={styles.paymentPickerContainer}>
                    <PaymentPicker onPayAll={handlePayAll} onPaySelected={handlePaySelected} selected={selectedTransactions > 0}/>
                </View>
            </View>

            <DatePicker
                modal
                date={dtInicio}
                open={dtInicioOpen}
                style={{ backgroundColor: black }}
                buttonColor={black}
                mode='date'
                onConfirm={(date) => {
                    setDtInicioOpen(false);
                    setDtInicio(date);
                }}
                onCancel={() => {
                    setDtInicioOpen(false);
                }}
            />

            <DatePicker
                modal
                date={dtFim}
                open={dtFimOpen}
                mode="date"
                onConfirm={(date) => {
                    setDtFimOpen(false);
                    setDtFim(date);
                }}
                onCancel={() => {
                    setDtFimOpen(false);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Add any container styles if needed
    },
    scrollViewContent: {
        paddingHorizontal: 10,
        paddingRight: 280,
    },
    datePickerContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datePicker: {
        backgroundColor: black,
    },
    actionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    searchButton: {
        width: 200,
        backgroundColor: gold,
        padding: 10,
        marginVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    searchButtonText: {
        color: black,
        fontWeight: 'bold',
    },
    paymentPickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FiltrosLancamento;