import {KeyboardTypeOptions, Text, TextInput, View} from 'react-native';
import {style} from './style';
import {gray2} from '../../utils/style-constants';
import {Picker} from '@react-native-picker/picker';

interface InputTextProps {
  label: string;
  placeholder: string;
  value: string;
  keyboard: KeyboardTypeOptions;
  onValueChange(item: string): void;
}

interface InputPickerTextProps {
  label: string;
  selectedValue: string;
  items: PickerItem[];
  onValueChange(item: string): void;
}

interface PickerItem {
  label: string;
  value: string | number;
}

export const InputText = (props: InputTextProps) => {
  return (
    <View>
      <Text style={style.label}>{props.label}</Text>
      <TextInput
        style={style.input}
        placeholder={props.placeholder}
        placeholderTextColor={gray2}
        keyboardType={props.keyboard}
        value={props.value}
        onChangeText={props.onValueChange}
      />
    </View>
  );
};

export const InputPickerText = (props: InputPickerTextProps) => {
  return (
    <View>
      <Text style={style.label}>{props.label}</Text>
      <View style={style.inputContainer}>
        <Picker
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}
          style={style.picker}
          dropdownIconColor="gray"
        >
            {props.items.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value}/>
            ))}
        </Picker>
      </View>
    </View>
  );
};
