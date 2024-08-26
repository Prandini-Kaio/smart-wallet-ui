import { Picker } from "@react-native-picker/picker"
import { View } from "react-native"
import { style } from "./style"
import { black, white } from "../../../../shared/utils/style-constants"
import { PickerItem } from "../../../../shared/utils/interface-utils";

interface PickerProps {
    label: string;
    selectedValue: string;
    items: PickerItem[];
    onValueChange(item: string): void;
}

export const FilterPicker = (props: PickerProps) => {
    return (
        <View style={style.container}>
            <Picker
                selectedValue={props.selectedValue}
                onValueChange={props.onValueChange}
                style={{ color: black, width: '120%' }}
                dropdownIconColor={black}
                dropdownIconRippleColor={white}
            >
                {props.items.map((item, index) => (
                    <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                        style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                        }}
                    />
                ))}
            </Picker>
        </View>
    )
}