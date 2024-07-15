import { FlatList, Text, SafeAreaView } from "react-native";
import { style } from "./style";
import CardGastos from "../../components/CardGastos";
import ContasCarousell from "../../components/Contas";
import FloatingButton from "../../components/FloatingButton";
import { purple } from "../../shared/styleConstants";

export default function Contas({ navigation }: any){

    return(
        <SafeAreaView style={style.container}>
            <ContasCarousell />
            <CardGastos />

            <FloatingButton onPress={{}} icone="plus" cor={purple}/>
        </SafeAreaView>
    )
}