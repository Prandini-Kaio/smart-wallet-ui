import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { style } from "./style";
import React from "react";

interface FloatingButtonProps {
    onPress: () => void;
    icone: string;
    color?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress, icone, color }: any) =>{
    return(
        <TouchableOpacity style={style.floatingButton} onPress={() =>{ 
                console.log("AAAAA");
                onPress();
            }}
        >
            <Icon
                style={style.icon}
                name={icone}
            />
        </TouchableOpacity>
    )
}

export default FloatingButton;