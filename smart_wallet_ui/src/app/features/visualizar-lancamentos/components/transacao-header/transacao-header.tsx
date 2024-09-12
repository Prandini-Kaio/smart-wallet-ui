import { SafeAreaView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { QuadTotalizador } from "../quad-totalizador.tsx/quad-totalizador";
import { black, gold, gray, lightGreen, white, green, red } from "../../../../shared/utils/style-constants";
import { FilterPicker } from "../filter-picker/filter-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-date-picker";
import { PickerItem } from "../../../../shared/utils/interface-utils";
import { startTransition, useEffect, useState } from "react";
import { LancamentoFilter } from "../../../lancamentos/services/entity/lancamento.entity";
import { Conta, StatusLancamento, TipoLancamento, TipoPagamento, TotalizadorFinanceiro, useAPI } from "../../../../shared/services/api/api-context";
import { formatDateTime } from "../../../lancamentos/services/usecases/date-utils.service";
import { useLancamentoService } from "../../../lancamentos/services/lancamentos.service";
import { useContaService } from "../../../contas/services/contas.service";
import { useIsFocused } from "@react-navigation/native";
import { StatusTransacaoEnum, TransacaoFilter } from "../../services/entity/transacao-entity";
import { getTotalizador } from "../../services/repository/transacao-repository";

export const TransacaoHeader = ({handleChange}: any) => {

    const focus = useIsFocused();

    const today = new Date();

    const { consultarCategorias } = useLancamentoService();
    const { consultarContas } = useContaService();

    const [totalizador, setTotalizador] = useState<TotalizadorFinanceiro>();

    const [dtInicioOpen, setDtInicioOpen] = useState(false);
    const [dtInicio, setDtInicio] = useState(new Date(today.getFullYear(), today.getMonth()-1, 1));

    const [dtFimOpen, setDtFimOpen] = useState(false);
    const [dtFim, setDtFim] = useState(new Date(today.getFullYear(), today.getMonth() +1, 0));

    const [tipo, setTipo] = useState('...');
    const [tipoItemsPicker, setTipoItemsPicker] = useState<PickerItem[]>([{ label: 'Entrada', value: 'ENTRADA' }, { label: 'Saida', value: 'SAIDA' }]);

    const [categoria, setCategoria] = useState('...');
    const [categoriaItemsPicker, setCategoriaItemsPicker] = useState<PickerItem[]>([]);

    const [tipoPagamento, setTipoPagamento] = useState('...');
    const [tipoPagamentoItemsPicker, setTipoPagamentoItemsPicker] = useState<PickerItem[]>([{ label: 'Crédito', value: 'CREDITO' }, { label: 'Débito', value: 'DEBITO' }]);

    const [status, setStatus] = useState('...')
    const [statusItemsPicker, setStatusItemsPicker] = useState<PickerItem[]>([
        { label: 'Atrasado', value: 'ATRASADO' },
        { label: 'Cancelado', value: 'CANCELADO' },
        { label: 'Pago', value: 'PAGO' },
        { label: 'Pendente', value: 'PENDENTE' }
    ]);

    const [conta, setConta] = useState('...');
    const [contasItemsPicker, setContasItemsPicker] = useState<PickerItem[]>([]);

    const [filter, setFilter] = useState<TransacaoFilter>();

    const handleFind = () => {
        const f: TransacaoFilter = {
            id: null,
            tipo: tipo != '...' ? TipoLancamento[tipo as keyof typeof TipoLancamento] : '',
            categoria: categoria != '...' ? categoria : '',
            pagamento:  tipoPagamento != '...' ? tipoPagamento : '',
            status: status != '...' ? status : '',
            dtInicio: formatDateTime(dtInicio, false),
            dtFim: formatDateTime(dtFim, true),
            conta: conta != '...' ? conta : '',
        }

        setFilter(f);
        handleChange(f);

        console.log(`INIT: ${f.dtInicio} - ${f.dtFim}`);

        getTotalizador(f)
            .then(result => {
                setTotalizador(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        consultarCategorias()
            .then((result) => {
                const resultado: string[] = JSON.parse(result);

                const categoriasItems: PickerItem[] = resultado.map(categoria => {
                    return {
                        label: categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase(),
                        value: categoria
                    };
                });
                setCategoriaItemsPicker(categoriasItems);
            }).catch((error) => {
                console.error(error);
            });

        consultarContas().then((result) => {
            const resultado: Conta[] = JSON.parse(result);
            const contaItems: PickerItem[] = resultado.flat().map(conta => {
                return {
                    label: conta.banco.charAt(0).toUpperCase() + conta.banco.slice(1).toLowerCase(),
                    value: conta.banco
                };
            });
            setContasItemsPicker(contaItems);
        })
    }, [focus])


    return (
        <>
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

            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 25, marginBottom: 15, gap: 5 }}>
                <FilterPicker
                    label={'categoria'}
                    items={[...categoriaItemsPicker, { label: '...', value: '...' }]}
                    selectedValue={categoria}
                    onValueChange={(itemValue) => setCategoria(itemValue)}
                />

                <FilterPicker
                    label={'tipo'}
                    items={[...tipoItemsPicker, { label: '...', value: '...' }]}
                    selectedValue={tipo}
                    onValueChange={(itemValue) => setTipo(itemValue)}
                />

                <FilterPicker
                    label={'pagamento'}
                    items={[...tipoPagamentoItemsPicker, { label: '...', value: '...' }]}
                    selectedValue={tipoPagamento}
                    onValueChange={(itemValue) => setTipoPagamento(itemValue)}
                />

                <FilterPicker
                    label={'status'}
                    items={[...statusItemsPicker, { label: '...', value: '...' }]}
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                />
            </SafeAreaView>

            <View style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: gray,
                        borderWidth: 0.5,
                        borderRadius: 20,
                        paddingHorizontal: 5
                    }}
                    onPress={() => {
                        setDtInicioOpen(true);
                    }}
                >
                    <Icon
                        color={lightGreen}
                        name="calendar"
                        size={20}
                    />
                    <Text style={{ color: gray }}>{dtInicio.toLocaleDateString('pt-br')}</Text>
                </TouchableOpacity>

                <FilterPicker
                    label={'contas'}
                    items={[...contasItemsPicker, { label: '...', value: '...' }]}
                    selectedValue={conta}
                    onValueChange={(itemValue) => setConta(itemValue)}
                />

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: gray,
                        borderWidth: 0.5,
                        borderRadius: 20,
                        paddingHorizontal: 5
                    }}
                    onPress={() => {
                        setDtFimOpen(true);
                    }}
                >
                    <Icon
                        color={lightGreen}
                        name="calendar"
                        size={20}
                    />
                    <Text style={{ color: gray }}>{dtFim.toLocaleDateString('pt-br')}</Text>
                </TouchableOpacity>
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
                style={{ backgroundColor: black }}
                mode="date"
                onConfirm={(date) => {
                    setDtFimOpen(false);
                    setDtFim(date);
                }}
                onCancel={() => {
                    setDtFimOpen(false);
                }}
            />

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={white}
                    onPress={() => handleFind()}
                >
                    <View style={{ width: 200, backgroundColor: gold, padding: 10, marginVertical: 10, borderRadius: 30, alignItems: 'center' }}>
                        <Text style={{ color: black, fontWeight: 'bold' }}>Buscar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </>
    )
}