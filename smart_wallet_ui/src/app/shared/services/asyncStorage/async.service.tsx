import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext } from "react";
import { showMessage } from "react-native-flash-message";

const storeKey = "@smartwallet";

export const _retrieveData = async (key: string) => {

    console.log("Consultando itens no storage.");

    try {
        const value = await AsyncStorage.getItem(`${storeKey}:${key}`);
        if (value !== null) {
            return value;
        }

        return null;
    } catch (error) {
        showMessage({
            message: 'Não foi possivel recuperar os itens salvos.',
            type: 'danger',
        });
        return null;
    }
}

export const _storeData = async (key: string, json: string) => {

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

export const _cleanData = async (key: string) => {

    console.log(`Limpando itens do storage ${key}.`);

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