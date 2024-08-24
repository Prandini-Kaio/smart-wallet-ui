import { Text, View } from "react-native"
import { style } from "./style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { black } from "../../../../shared/utils/style-constants"

export const QuadTotalizador = ({iconName, iconColor, value}: any) => {
    return (
        <View
            style={style.container}
        >
            <Icon name={iconName} color={iconColor} size={25} />
            <Text style={style.moneyTxt}>R$ {value}</Text>
        </View>
    )
}