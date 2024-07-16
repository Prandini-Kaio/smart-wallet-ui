import { FlatList, Text, SafeAreaView } from "react-native";
import { style } from "./style";
import CardGastos from "../../components/CardGastos";
import ContasCarousell from "../../components/Contas";
import FloatingButton from "../../components/FloatingButton";
import { purple } from "../../shared/styleConstants";
import { useState } from "react";
import FormAddConta from "../../components/FormAddConta";

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