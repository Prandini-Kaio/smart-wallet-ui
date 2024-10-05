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
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(100)).current;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        Animated.parallel([
            Animated.spring(rotation, {
                toValue: isOpen ? 0 : 1,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: isOpen ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: isOpen ? 100 : 0,
                friction: 8,
                useNativeDriver: true,
            })
        ]).start();
    };

    const handleOptionPress = (optionPress: any) => {
        optionPress();
        toggleMenu();
      };

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg'],
    });

    return (
        <View style={style.container}>
            <Animated.View
                style={[
                    style.optionsContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
                pointerEvents={ isOpen ? 'auto' : 'none'}
            >
                <TouchableOpacity style={style.option} onPress={() => handleOptionPress(onContaPress)}>
                    <Text style={style.optionText}>Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.option} onPress={() => handleOptionPress(onLancamentoPress)}>
                    <Text style={style.optionText}>Lancamento</Text>
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity style={style.addButton} onPress={toggleMenu}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <Icon name={isOpen ? "plus" : "segment"} size={24} color="white" />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

export default FloatingButton;