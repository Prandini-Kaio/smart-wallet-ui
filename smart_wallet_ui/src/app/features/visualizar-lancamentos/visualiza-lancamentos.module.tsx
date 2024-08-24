import { Button, Text, TouchableOpacity, View } from "react-native"
import { black, gold, gray, green, lightGreen, red, white } from "../../shared/utils/style-constants"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { QuadTotalizador } from "./components/quad-totalizador.tsx/quad-totalizador"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { PickerItem } from "../../shared/utils/interface-utils"
import { FilterPicker } from "./components/filter-picker/filter-picker"
import DatePicker from "react-native-date-picker"

export const VisualizarLancamentos = () => {

    const [dtInicioOpen, setDtInicioOpen] = useState(false);
    const [dtInicio, setDtInicio] = useState(new Date());

    const [dtFimOpen, setDtFimOpen] = useState(false);
    const [dtFim, setDtFim] = useState(new Date());

    const [item, setItem] = useState('');
    const items: PickerItem[] = [
        {
            label: 'Em aberto',
            value: 'EM_ABERTO'
        },
        {
            label: 'Quitado',
            value: 'QUITADO'
        }
    ]

    const [pagamentoItem, setPagamentoItem] = useState('');
    const pagamentoItems: PickerItem[] = [
        {
            label: 'Entrada',
            value: 'ENTRADA'
        },
        {
            label: 'Saida',
            value: 'SAIDA'
        }
    ]

    return (
        <View style={{ flex: 1, backgroundColor: white, padding: 10 }}>
            <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'center' }}>

                <QuadTotalizador
                    iconName={"chevron-double-up"}
                    iconColor={green}
                    value={'100.00'}
                />

                <QuadTotalizador
                    iconName={"cash"}
                    iconColor={black}
                    value={'100.00'}
                />

                <QuadTotalizador
                    iconName={"chevron-double-down"}
                    iconColor={red}
                    value={'130.00'}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, gap: 10 }}>
                <FilterPicker
                    label={'status'}
                    items={items}
                    selectedValue={item}
                    onValueChange={(itemValue) => setItem(itemValue)}
                />

                <FilterPicker
                    label={'status'}
                    items={pagamentoItems}
                    selectedValue={pagamentoItem}
                    onValueChange={(itemValue) => setPagamentoItem(itemValue)}
                />

                <FilterPicker
                    label={'status'}
                    items={items}
                    selectedValue={item}
                    onValueChange={(itemValue) => setItem(itemValue)}
                />

                <FilterPicker
                    label={'status'}
                    items={items}
                    selectedValue={item}
                    onValueChange={(itemValue) => setItem(itemValue)}
                />

                <FilterPicker
                    label={'status'}
                    items={items}
                    selectedValue={item}
                    onValueChange={(itemValue) => setItem(itemValue)}
                />
            </View>

            <View style={{
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
        </View>
    )
}