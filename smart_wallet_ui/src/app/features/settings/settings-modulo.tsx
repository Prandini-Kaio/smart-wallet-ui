import { Animated, Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { backgroundColor, black, clearColor, gray, gray2, green, highlightColor, lightGreen, principalColor, red, secondaryColor, shadowClearColor, white } from "../../shared/utils/style-constants";
import { useEffect, useRef, useState } from "react";
import { useEnvironment } from "../../../environments/environments";
import { useAPI } from "../../shared/services/api/api-context";


const { width } = Dimensions.get('window');

export default function SettingsModule() {

    const { apiUrl, setApiUrl } = useEnvironment();
    const [tempApiUrl, setTempApiUrl] = useState(apiUrl);
    const [activeMenu, setActiveMenu] = useState('general');
    const slideAnim = useRef(new Animated.Value(0)).current;

    const { ping } = useAPI();
    const [statusApi, setStatusApi] = useState(false);

    useEffect(() => {
        ping()
            .then((result) => {
                if (result)
                    setStatusApi(true);
                else
                    setStatusApi(false);
            }).catch((error) => {
                setStatusApi(false);
            })
    }, [apiUrl]);

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

            <View style={{ width: '100%', position: 'absolute', bottom: 0, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: clearColor }}>{apiUrl}</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: statusApi ? green : red }}>{statusApi ? 'OK' : 'Offline'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: principalColor,
    },
    title: {
        color: clearColor,
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
        backgroundColor: backgroundColor,
        padding: 15,
        borderRightWidth: 0.5,
        borderRightColor: clearColor,
        borderBottomStartRadius: 25,
        alignItems: 'center',
    },

    menuRightButton: {
        flex: 1,
        backgroundColor: backgroundColor,
        padding: 15,
        borderLeftWidth: 0.5,
        borderLeftColor: clearColor,
        borderBottomEndRadius: 25,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: secondaryColor,
    },
    buttonText: {
        color: principalColor,
    },
    activeButtonText: {
        color: clearColor,
        fontWeight: 'bold'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: backgroundColor,
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
        borderBottomColor: clearColor,
    },
    input: {
        color: black,
        borderWidth: 1,
        borderColor: shadowClearColor,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    saveButton: {
        backgroundColor: highlightColor,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveButtonText: {
        color: principalColor,
        fontWeight: 'bold'
    },
    txt: {
        color: black,
        fontWeight: 'bold'
    }
});