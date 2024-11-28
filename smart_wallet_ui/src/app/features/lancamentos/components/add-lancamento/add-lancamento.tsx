import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, Switch, Text, TextInput, TouchableHighlight, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { InputPickerText, InputText } from "../../../../shared/components/input-form/input-form";
import { Conta, StatusLancamento, TipoLancamento, TipoPagamento } from "../../../../shared/services/api/api-context";
import { PickerItem } from "../../../../shared/utils/interface-utils";
import { backgroundColor, black, clearColor, gold, gray, gray2, lightGray, lightGreen, platina, principalColor, highlightColor, secondaryColor, shadowClearColor, white } from "../../../../shared/utils/style-constants";
import DatePickerCustom from "../../../visualizar-lancamentos/components/filter-picker/date-picker";
import { LancamentoResponse } from "../../services/entity/lancamento.entity";
import { useLancamentoService } from "../../services/lancamentos.service";
import { formatDateTime } from "../../services/usecases/date-utils.service";
import { style } from "./style";
import { useContaService } from "../../../contas/services/conta.service";

export default function AddLancamento({ navigation }: any) {


    const focus = useIsFocused();

    const [conta, setConta] = useState('');
    const [valor, setValor] = useState('');
    const [isCredito, setIsCredito] = useState(true);
    const [isSaida, setIsSaida] = useState(true);
    const [categoria, setCategoria] = useState('MORADIA');
    const [parcelas, setParcelas] = useState('');
    const [descricao, setDescricao] = useState('');

    const [enableCredito, setEnableCredito] = useState(false);
    const [enableSaida, setEnableSaida] = useState(false);

    const [categoriaItemsPicker, setCategoriaItemsPicker] = useState<PickerItem[]>([]);
    const [contaItemsPicker, setContaItemsPicker] = useState<PickerItem[]>([]);

    const [data, setData] = useState(new Date());
    const [dataOpen, setDataOpen] = useState(false);

    const toggleSwitchCredito = () => {
        setIsCredito(prevState => !prevState);
    }

    const toggleSwitchSaida = () => {
        setIsSaida(prevState => !prevState);
        if (isSaida) {
            setEnableCredito(false);
            setIsCredito(false);
        }
        else
            setEnableCredito(true);
    }

    const handleSubmit = () => {
        criar();
    }

    const { criarLancamento, consultarCategorias } = useLancamentoService();
    const { consultarContas } = useContaService();

    const criar = () => {

        const lancamento: LancamentoResponse = {
            id: 0,
            conta: conta,
            valor: parseFloat(valor),
            tipoLancamento: isSaida ? TipoLancamento.SAIDA : TipoLancamento.ENTRADA,
            tipoPagamento: isCredito ? TipoPagamento.CREDITO : TipoPagamento.DEBITO,
            categoriaLancamento: categoria,
            parcelas: parseInt(parcelas),
            descricao: descricao,
            icone: '',
            dtCriacao: formatDateTime(data),
            status: StatusLancamento.EM_ABERTO,
            dtAlteracaoStatus: ''
        }

        console.log("CRIANDO: " + categoria + conta);

        criarLancamento(lancamento);
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
            setContaItemsPicker([...contaItems, { label: '...', value: '' }]);
        })
    }, [focus])

    const PickerRender = () => {
        return (
            <Picker
                selectedValue={conta}
                onValueChange={(item) => setConta(item)}
                style={{
                    width: 125,
                    color: clearColor,
                }}
                dropdownIconColor={clearColor}
                mode='dropdown'
            >
                {contaItemsPicker.map((item, index) => (
                    <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                        style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                        }} />
                ))}
            </Picker>
        )
    }

    return (
        <SafeAreaView style={style.container}>

            <View style={{ ...style.sendToContainer, zIndex: 1 }}>
                <Text style={{ fontSize: 16, color: black, fontWeight: "bold" }}>Send to</Text>
                <View style={style.contaPicker}>
                    <PickerRender />
                </View>
            </View>

            <View style={style.moneyContaineir}>
                <Text style={{
                    color: clearColor,
                    fontSize: 32
                }}>R$</Text>
                <TextInput
                    style={style.txtCash}
                    placeholderTextColor={shadowClearColor}
                    placeholder="10"
                    keyboardType='number-pad'
                    value={valor}
                    onChangeText={setValor}
                />
            </View>

            <View style={style.datePickerContainer}>
                <DatePickerCustom
                    setDtInicioOpen={() => setDataOpen(true)}
                    date={data}
                />
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <View style={{}}>
                    <Text style={{
                        color: enableCredito ? gray2 : black,
                        fontWeight: 'bold'
                    }}
                    >Crédito</Text>
                    <Switch
                        trackColor={{ false: gray2, true: secondaryColor }}
                        thumbColor={white}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchCredito}
                        value={isCredito}
                        disabled={enableCredito}
                    />
                </View>

                <View style={{}}>
                    <Text style={{
                        color: black,
                        fontWeight: 'bold'
                    }}
                    >Saída</Text>
                    <Switch
                        trackColor={{ false: gray2, true: secondaryColor }}
                        thumbColor={white}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchSaida}
                        value={isSaida}
                        disabled={enableSaida}
                    />
                </View>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <InputPickerText
                    label="Categoria"
                    selectedValue={categoria}
                    onValueChange={(value: string) => setCategoria(value)}
                    items={categoriaItemsPicker}
                />
                <InputText
                    label="Parcelas"
                    placeholder="01"
                    keyboard="numeric"
                    value={parcelas}
                    onValueChange={setParcelas}
                />
            </View>

            <TextInput
                style={{
                    width: '95%',
                    height: 150,
                    borderColor: shadowClearColor,
                    borderWidth: 0.5,
                    borderRadius: 20,
                    color: secondaryColor
                }}
                placeholder="Descricao"
                placeholderTextColor={clearColor}
                value={descricao}
                onChangeText={setDescricao}
            />
            <View style={{ width: '40%', justifyContent: 'center' }}>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={backgroundColor}
                    onPress={handleSubmit}
                >
                    <View style={{ backgroundColor: highlightColor, padding: 10, marginVertical: 10, borderRadius: 30, alignItems: 'center' }}>
                        <Text style={{ color: principalColor, fontWeight: 'bold' }}>ENVIAR</Text>
                    </View>
                </TouchableHighlight>
            </View>

            <DatePicker
                modal
                date={data}
                open={dataOpen}
                mode="date"
                onConfirm={(date) => {
                    setDataOpen(false);
                    setData(date);
                }}
                onCancel={() => {
                    setDataOpen(false);
                }}
            />
        </SafeAreaView >
    )
}