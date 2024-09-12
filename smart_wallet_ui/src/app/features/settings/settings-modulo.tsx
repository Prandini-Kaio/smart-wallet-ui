import { Animated, Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { black, gray, gray2, lightGreen, white } from "../../shared/utils/style-constants";
import { useRef, useState } from "react";
import { useEnvironment } from "../../../environments/environments";


const { width } = Dimensions.get('window');

export default function SettingsModule() {

    const { apiUrl, setApiUrl } = useEnvironment();
    const [tempApiUrl, setTempApiUrl] = useState(apiUrl);
    const [activeMenu, setActiveMenu] = useState('general');
    const slideAnim = useRef(new Animated.Value(0)).current;

    const switchContent = (menu: any) => {
        if (menu === activeMenu) return;

        const direction = menu === 'general' ? -1 : 1;
        Animated.sequence([
            Animated.timing(slideAnim, {
                toValue: -direction * width,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: direction * width,
                duration: 0,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();

        setActiveMenu(menu);
    };

    const saveApiUrl = () => {
        setApiUrl(tempApiUrl);
    }

    const renderContent = () => {
        if (activeMenu === 'general') {
            return (
                <View>
                    <Text style={styles.contentTitle}>General Settings</Text>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.txt}>Not implemented yet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.txt}>Not implemented yet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.txt}>Change backend address</Text>
                        <TextInput
                            style={styles.input}
                            value={tempApiUrl}
                            onChangeText={setTempApiUrl}
                            placeholder="Endereço da API"
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={saveApiUrl}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.contentTitle}>Account Settings</Text>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.txt}>Not implemented yet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.txt}>Not implemented yet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.txt}>Not implemented yet</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.menuLeftButton, activeMenu === 'general' && styles.activeButton]}
                    onPress={() => switchContent('general')}
                >
                    <Text style={activeMenu === 'general' ? styles.activeButtonText : styles.buttonText}>General</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.menuRightButton, activeMenu === 'account' && styles.activeButton]}
                    onPress={() => switchContent('account')}
                >
                    <Text style={activeMenu === 'account' ? styles.activeButtonText : styles.buttonText}>Account</Text>
                </TouchableOpacity>
            </View>

            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        transform: [{ translateX: slideAnim }],
                    },
                ]}
            >
                {renderContent()}
            </Animated.View>

            <Text style={{position: 'absolute', bottom: 0, fontSize: 11, fontWeight: 'bold', color: black }}>{apiUrl}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    title: {
        color: gray,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    menuLeftButton: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        borderRightWidth: 0.5,
        borderRightColor: gray2,
        borderBottomStartRadius: 25,
        alignItems: 'center',
    },

    menuRightButton: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        borderLeftWidth: 0.5,
        borderLeftColor: gray2,
        borderBottomEndRadius: 25,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: lightGreen,
    },
    buttonText: {
        color: lightGreen,
    },
    activeButtonText: {
        color: white,
        fontWeight: 'bold'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 20,
    },
    contentTitle: {
        color: black,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    input: {
        color: black,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#ffffff',
    },
    txt: {
        color: black,
        fontWeight: 'bold'
    }
});