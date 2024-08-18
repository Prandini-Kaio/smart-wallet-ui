import { FlatList, Text, SafeAreaView } from "react-native";
import { style } from "./style";
import CardGastos from "../../contas/components/gastos/gastos";
import ContasCarousell from "./cards";
import FloatingButton from "../../../shared/components/floating-button/floating-button";
import { useState } from "react";
import FormAddConta from "../components/form-conta/form-conta";

export default function Contas({ navigation }: any){

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
      setModalVisible(true);
    };
  
    const hideModal = () => {
      setModalVisible(false);
    };

    return(
        <SafeAreaView style={style.container}>
            <ContasCarousell />
            <CardGastos />

            <FloatingButton onPress={showModal} icone="plus"/>

            <FormAddConta 
                visible={modalVisible}
                hideModal={hideModal}
            />
        </SafeAreaView>
    )
}