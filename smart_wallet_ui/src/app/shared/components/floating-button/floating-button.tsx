import { Animated, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { style } from "./style";
import React, { useRef, useState } from "react";
import { white } from "../../utils/style-constants";

interface FloatingButtonProps {
    onContaPress: () => void;
    onLancamentoPress: () => void;
    icone: string;
    color?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onContaPress, onLancamentoPress, icone, color }: any) => {

    const [isOpen, setIsOpen] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        Animated.spring(rotation, {
            toValue: isOpen ? 0 : 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg'],
    });

    return (
        <View>
            {isOpen && (
                <View style={style.optionsContainer}>
                    <TouchableOpacity style={style.option} onPress={onContaPress && toggleMenu}>
                        <Text style={style.optionText}>Conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.option} onPress={onLancamentoPress}>
                        <Text style={style.optionText}>Lancamento</Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity style={style.addButton} onPress={toggleMenu}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <Icon name={isOpen ? "plus" : "segment"} size={24} color="white" />
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

export default FloatingButton;