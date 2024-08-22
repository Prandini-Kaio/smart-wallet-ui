import { Button, Switch, Text, TextInput, TouchableHighlight, View } from "react-native"
import { black, gold, gray, gray2, green, lightGray, lightGreen, white, yellow } from "../../../../shared/utils/style-constants"
import { style } from "./style"
import { useEffect, useState } from "react"
import { InputPickerText, InputText } from "../../../../shared/components/input-form/input-form";
import { Picker } from "@react-native-picker/picker";
import { LancamentoResponse } from "../../services/entity/lancamento.entity";
import { Conta, StatusLancamento, TipoLancamento, TipoPagamento } from "../../../../shared/services/api/api-context";
import { useLancamentoService } from "../../services/lancamentos.service";
import { useIsFocused } from "@react-navigation/native";
import { useContaService } from "../../../contas/services/contas.service";

interface PickerItem {
    label: string;
    value: string | number;
}

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
            dtCriacao: '',
            status: StatusLancamento.EM_ABERTO,
            dtAlteracaoStatus: ''
        }

        console.log("CRIANDO: " + categoria + conta);

        criarLancamento(lancamento);
    }

    useEffect(() => {
        consultarCategorias()
            .then((result) => {
                const resultado:string[] = JSON.parse(result);
                
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
                setContaItemsPicker(contaItems);
        })
    }, [focus])

    const PickerRender = () => {
        return (
            <View style={style.contaPicker}>
                <Picker
                    selectedValue={conta}
                    onValueChange={(item) => setConta(item)}
                    style={{ color: black, width: 130 }}
                >
                    {contaItemsPicker.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} style={{ fontSize: 12, fontWeight: 'bold' }} />
                    ))}
                </Picker>
            </View>
        )
    }

    return (
        <View style={style.container}>

            <View style={style.sendToContainer}>
                <Text style={{ fontSize: 16, color: black, fontWeight: "bold" }}>Send to</Text>
                <PickerRender />
            </View>

            <View style={style.moneyContaineir}>
                <Text style={{
                    color: gray,
                    fontSize: 32
                }}>R$</Text>
                <TextInput
                    style={style.txtCash}
                    placeholderTextColor={lightGray}
                    keyboardType='number-pad'
                    value={valor}
                    onChangeText={setValor}
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
                        trackColor={{ false: gray2, true: lightGreen }}
                        thumbColor={white}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchCredito}
                        value={isCredito}
                        disabled={enableCredito}
                    />
                </View>

                <View style={{}}>
                    <Text style={{
                        color: enableCredito ? gray2 : black,
                        fontWeight: 'bold'
                    }}
                    >Saída</Text>
                    <Switch
                        trackColor={{ false: gray2, true: lightGreen }}
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
                    borderColor: lightGray,
                    borderWidth: 0.5,
                    borderRadius: 20,
                    color: gray
                }}
                placeholder="Descricao"
                placeholderTextColor={gray2}
                value={descricao}
                onChangeText={setDescricao}
            />
            <View style={{ width: '40%', justifyContent: 'center' }}>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={white}
                    onPress={handleSubmit}
                >
                    <View style={{ backgroundColor: gold, padding: 10, marginVertical: 10, borderRadius: 30, alignItems: 'center' }}>
                        <Text style={{ color: black, fontWeight: 'bold' }}>ENVIAR</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View >
    )
}