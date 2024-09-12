import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

const ConfirmTransactionComponent = ({
    isModalVisible,
    onPressPayNow,
    onConfirm,
    onCancel,
    descricao
  }: any) => {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={onCancel}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Deseja continuar o pagamento da transação {descricao}?</Text>
              <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                <Text style={styles.buttonText}>Confirmar pagamento</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

export default ConfirmTransactionComponent;