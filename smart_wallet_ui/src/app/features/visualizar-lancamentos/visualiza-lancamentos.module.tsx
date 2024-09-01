import { Text, View } from "react-native"
import { black, gold, gray, green, lightGreen, red, white } from "../../shared/utils/style-constants"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { TransacaoHeader } from "./components/transacao-header/transacao-header"

export const VisualizarLancamentos = () => {
    return (
        <View style={{ flex: 1, backgroundColor: white }}>
            <TransacaoHeader />
            <View style={{borderTopColor: black, borderTopWidth: 0.5, borderTopEndRadius: 20}}>
                <View style={{backgroundColor: lightGreen, height:'100%', alignItems: 'center'}}>
                    <View style={{
                            backgroundColor: black, 
                            width: '90%', 
                            height: '8%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Icon name="beach" size={24}/>
                        <Text>Carro [1/2]</Text>
                        <Text>R$ 100,00</Text>
                        <Text>10/12/24</Text>
                        <Text>PAGO</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}