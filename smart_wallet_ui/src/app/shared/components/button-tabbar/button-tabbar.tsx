import { View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import style from "./style"
import { white } from "../../../shared/utils/style-constants"

export type ButtonTabBarProps = {
    focused: boolean,
    color: string,
    icon: string,
    defaultColor: string
}

export default function ButtonTabBar(props: ButtonTabBarProps){
    return(
        <View style={[style.container, {backgroundColor: props.focused ? props.defaultColor : white}]}>
            <Icon size={30} color={props.color} name={props.icon} />
        </View>
    )
}