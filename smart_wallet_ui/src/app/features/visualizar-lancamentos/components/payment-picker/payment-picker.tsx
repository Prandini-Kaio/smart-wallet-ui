import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface PaymentPickerProps {
  onPayAll: () => void;
  onPaySelected: () => void;
}

const PaymentPicker: React.FC<PaymentPickerProps> = ({ onPayAll, onPaySelected }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = (): void => setIsOpen(!isOpen);

  const handlePayAll = (): void => {
    onPayAll();
    toggleModal();
  };

  const handlePaySelected = (): void => {
    onPaySelected();
    toggleModal();
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.option} onPress={handlePayAll}>
              <Text style={styles.optionText}>Pagar todos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handlePaySelected}>
              <Text style={styles.optionText}>Pagar selecionados</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 15,
  },
  cancelButtonText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default PaymentPicker;