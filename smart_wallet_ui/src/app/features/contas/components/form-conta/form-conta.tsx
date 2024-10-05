import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomColorPicker from '../../../../shared/components/color-picker/color-picker';
import { Conta, TipoConta, useAPI } from '../../../../shared/services/api/api-context';
import { gray2 } from '../../../../shared/utils/style-constants';
import CustomPicker from '../../../visualizar-lancamentos/components/filter-picker/picker';
import { style } from './style';
import { returnedResults } from 'reanimated-color-picker';


export default function AddConta({ navigation, visible }: any) {
  const [formData, setFormData] = useState<Conta>({
    id: 0,
    banco: '',
    nome: '',
    dtVencimento: new Date().toISOString().split('T')[0],
    diaVencimento: '',
    saldoParcial: 0,
    tipoConta: TipoConta.CORRENTE_POUPANCA,
    color: ''
  });

  const { createConta } = useAPI();

  const [errors, setErrors] = useState<Partial<Conta>>({});

  const [color, setColor] = useState('#ffffff');

  const onSelectColor = (color: returnedResults) => {
    setColor(color.hex);
    handleChange('color', color.hex);
  };

  const handleChange = (name: keyof Conta, value: string | number | TipoConta) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Conta> = {};
    if (!formData.banco) newErrors.banco = 'Banco é obrigatório';
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.dtVencimento) newErrors.dtVencimento = 'Data de vencimento é obrigatória';
    if (!formData.diaVencimento) newErrors.diaVencimento = 'Dia de vencimento é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      createConta(formData);
      console.log(`FORMD ATA : \n${formData}`);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>


        <Text style={style.label}>Banco</Text>
        <TextInput
          style={style.input}
          placeholder="Banco"
          placeholderTextColor={gray2}
          value={formData.banco}
          onChangeText={(value) => handleChange('banco', value)}
        />
        {errors.banco && <Text style={style.errorText}>{errors.banco}</Text>}

        <Text style={style.label}>Conta</Text>
        <TextInput
          style={style.input}
          placeholder="Poupança"
          placeholderTextColor={gray2}
          value={formData.nome}
          onChangeText={(value) => handleChange('nome', value)}
        />
        {errors.nome && <Text style={style.errorText}>{errors.nome}</Text>}

        <Text style={style.label}>Dia de vencimento</Text>
        <TextInput
          style={style.input}
          placeholder="01"
          placeholderTextColor={gray2}
          value={formData.diaVencimento}
          onChangeText={(value) => handleChange('diaVencimento', value)}
          keyboardType="numeric"
        />
        {errors.diaVencimento && <Text style={style.errorText}>{errors.diaVencimento}</Text>}

        <View style={{
          alignItems: 'center'
        }}>
          <CustomPicker
            selectedValue={formData.tipoConta}
            onValueChange={(value) => handleChange('tipoConta', value as TipoConta)}
            label={'Tipo Conta'}
            options={[
              { label: "Corrente/Poupanca", value: "CORRENTE_POUPANCA" },
              { label: "Economia", value: "ECONOMIA" },
              { label: "Investimento", value: "INVESTIMENTO" }
            ]}
          />
        </View>

        <CustomColorPicker 
          setColor={(color: returnedResults) => onSelectColor(color)} 
          onSelectColor={onSelectColor} 
        />

        <TouchableOpacity style={style.button} onPress={handleSubmit}>
          <Text style={style.buttonText}>Adicionar Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
