import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { black, gray, lightGreen } from '../../../../shared/utils/style-constants';

const { width } = Dimensions.get('window'); // Obtém a largura da tela

interface Props {
  setDtInicioOpen: (open: boolean) => void;
  date: Date
}

const DatePickerCustom: React.FC<Props> = ({ setDtInicioOpen, date }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={(event: GestureResponderEvent) => setDtInicioOpen(true)}
    >
      <Icon
        color={lightGreen}
        name="calendar"
        size={width * 0.05} // Tamanho do ícone relativo à largura da tela (5% da largura)
      />
      <Text style={[styles.text, { color: gray }]}>{date.toLocaleDateString('pt-br')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: gray,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: width * 0.03, // Padding horizontal relativo à largura da tela (3%)
    paddingVertical: width * 0.02, // Padding vertical (2%)
    marginVertical: 10, // Margem vertical para separação dos elementos
  },
  text: {
    color: black,
    fontSize: width * 0.04, // Tamanho do texto proporcional (4% da largura)
    marginLeft: 10, // Espaçamento entre o ícone e o texto
  },
});

export default DatePickerCustom;
