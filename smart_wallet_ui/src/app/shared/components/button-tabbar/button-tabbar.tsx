import { View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import style from "./style"
import { midnightGreen, platina, richBlack, white } from "../../../shared/utils/style-constants"

export type ButtonTabBarProps = {
    focused: boolean,
    color: string,
    icon: string,
    defaultColor: string
}

export default function ButtonTabBar(props: ButtonTabBarProps){
    return(
        <View style={[
            style.container, 
            {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderRadius: 50,
            }
            ]}
        >
            <Icon size={30} color={richBlack} name={props.icon} 
            style={{
                backgroundColor: props.defaultColor && props.focused ? white: 'rgba(0, 0, 0, 0)',
                color: props.defaultColor && props.focused ? richBlack: white,
                borderRadius: 30,
                padding: 10
            }}/>
        </View>
    )
}