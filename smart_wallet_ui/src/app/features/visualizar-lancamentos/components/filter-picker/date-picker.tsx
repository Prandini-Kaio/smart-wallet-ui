import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { black, clearColor, gray, lightGreen, principalColor, highlightColor, secondaryColor, shadowClearColor, pewterBlue } from '../../../../shared/utils/style-constants';

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
        color={principalColor}
        name="calendar"
        size={width * 0.05} // Tamanho do ícone relativo à largura da tela (5% da largura)
      />
      <Text style={[styles.text, { color: pewterBlue }]}>{date.toLocaleDateString('pt-br')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: shadowClearColor,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.02,
    marginVertical: 10,
  },
  text: {
    color: principalColor,
    fontSize: width * 0.04,
    marginLeft: 10,
  },
});

export default DatePickerCustom;
