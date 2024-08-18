import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext } from "react";
import { showMessage } from "react-native-flash-message";

const storeKey = "@smartwallet";

interface StorageContextData {
    _storeData(key: string, json: string): Promise<void>;
    _retrieveData(key: string): Promise<string>;
    _cleanData(key: string): Promise<void>;
}

const StorageContext = createContext<StorageContextData>({} as StorageContextData);

function StorageProvider({ children }: any) {


    const _storeData = async (key: string, json: string) => {
        
        console.log("Salvando item no storage.");

        try {
            await AsyncStorage.setItem(
                `${storeKey}:${key}`,
                JSON.stringify(json)
            );

            console.log("Item salvo com sucesso!");
        } catch (error) {
            showMessage({
                message: 'Não foi possivel salvar o item.',
                type: 'danger',
            });
        }
    }

    const _retrieveData = async (key: string) => {

        console.log("Consultando itens no storage.");

        try {
            const value = await AsyncStorage.getItem(`${storeKey}:${key}`);
            if (value !== null) {
                console.log(value);
                return value;
            }

            return "";
        } catch (error) {
            showMessage({
                message: 'Não foi possivel recuperar os itens salvos.',
                type: 'danger',
            });
        }

        return "";
    }

    const _cleanData = async (key: string) => {

        console.log("Limpand itens do storage.");

        try {
            await AsyncStorage.removeItem(`${storeKey}:${key}`);

            console.log(`Itens com a chave ${key} foram limpos do storage.`)
        } catch (error) {
            showMessage({
                message: 'Não foi possivel apagar os itens salvos.',
                type: 'danger',
            });
        }
    }

    return (
        <StorageContext.Provider
            value={{
                _storeData,
                _retrieveData,
                _cleanData
            }}
        >
            {children}
        </StorageContext.Provider>
    )
}

const useStorage = () => {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error('useStorage precisa de um storageContext para ser usado');
    }

    return context;
};

export { StorageProvider, useStorage }