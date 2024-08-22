import { _updatePropsJS } from "react-native-reanimated/lib/typescript/js-reanimated";
import { useAPI } from "../../../shared/services/api/api-context";
import { _cleanData, _storeData, _retrieveData } from "../../../shared/services/asyncStorage/async.service";
import { LancamentoResponse } from "./entity/lancamento.entity";
import { assertEasingIsWorklet } from "react-native-reanimated/lib/typescript/animation/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContaService } from "../../contas/services/contas.service";

export const useLancamentoService = () => {

    const LANCAMENTOS_PENDENTES_STORAGE_KEY = 'lancamentos-pendentes';
    const LANCAMENTOS_STORAGE_KEY = 'lancamentos';
    const CATEGORIAS_LANCAMENTOS_STORAGE_KEY = 'categorias-lancamentos';

    const { ping, createLancamento, getLancamentos, getCategorias } = useAPI();

    const isConnected = async (): Promise<boolean> => {
        try {
            await ping();
            return true;
        } catch (error) {
            return false;
        }
    }

    const criar = async (lancamento: LancamentoResponse) => {
        console.log("Iniciando criação de lançamento.");

        if (await isConnected() === false) {
            console.log("Iniciando cadastro de lançamentos no storage.");
            await create(lancamento, LANCAMENTOS_PENDENTES_STORAGE_KEY);
            return;
        }

        await createLancamento(lancamento);
        console.log("Lançamento cadastrado com sucesso!");
    }

    const consultar = async () => {
        console.log("Iniciando consulta de lançamentos.");

        await sincronizar();

        const lancamentos = await read(LANCAMENTOS_STORAGE_KEY);

        return lancamentos;
    }

    const consultarCategorias = async () => {
        console.log("Iniciando consulta de categorias.");
    
        await sincronizarCategorias(); // Sincroniza as categorias
    
        const categoriasString = await _retrieveData(CATEGORIAS_LANCAMENTOS_STORAGE_KEY);
    
        if (!categoriasString) {
            return [];
        }
    
        try {
            const categorias = JSON.parse(categoriasString);
            console.log(categorias)
            return categorias;
        } catch (error) {
            console.error("Erro ao parsear categorias:", error);
            return [];
        }
    }

    const read = async (key: string) => {
        console.log(`Iniciando consulta com a chave [${key}].`);

        try {
            const lancamentosString = await _retrieveData(key);

            if (!lancamentosString) {
                console.log(`Nenhum dado encontrado para a chave [${key}].`);
                return "{}";
            }

            // console.log(`Dados brutos do storage: ${lancamentosString}.`);

            try {
                const lancamentos = JSON.parse(lancamentosString);
                // console.log("Dados parseados: " + lancamentos)
                return lancamentos;
            } catch (jsonError) {
                console.error("Erro ao parsear JSON dos lançamentos:", jsonError);
                return "{}";
            }

        } catch (error) {
            console.error(`Erro ao consultar lançamentos com a chave [${key}]:`, error);
            return "{}";
        }
    };


    const create = async (lancamento: LancamentoResponse, key: string) => {
        console.log('Iniciando save de lancamento no storage.');

        const lancamentos = await read(key);

        lancamentos.push(lancamento);

        await _storeData(key, JSON.stringify(lancamentos.flat()));
    }

    const sincronizar = async () => {

        if(!isConnected()){
            console.log("Conexão não estabelecida, verifique sua conexão com a internet.");
            return;
        }

        await sincronizarLancamentos();
        await sincronizarCategorias();
    };

    const sincronizarLancamentos = async () => {
        console.log("Iniciando sincronia de lançamentos.");

        if (!isConnected())
            return;

        try {
            const lancamentosPendentes = JSON.parse(await read(LANCAMENTOS_PENDENTES_STORAGE_KEY));

            if (lancamentosPendentes) {

                console.log("Sincronizando lançamentos pendentes.");

                for (let index = 0; index < lancamentosPendentes.length; index++) {
                    const element = lancamentosPendentes[index];
                    console.log(element)
                    await criar(element);
                }

                await _cleanData(LANCAMENTOS_PENDENTES_STORAGE_KEY);

                console.log("Lançamentos pendentes sincronizados com sucesso!");

                return;
            }
        } catch (error) {
            console.error(error);
        }

        console.log("Sincronizando storage local com lancamentos.");

        const lancamentos = await getLancamentos();

        await _cleanData(LANCAMENTOS_STORAGE_KEY);
        await _storeData(LANCAMENTOS_STORAGE_KEY, JSON.stringify(lancamentos.flat()));

        console.log("Lançamentos sincronizados com sucesso!");

        return;
    }

    const sincronizarCategorias = async () => {
        console.log("Iniciando sincronia de categorias.");

        try {
            const categorias = await getCategorias();
            
            if(categorias){
                await _cleanData(CATEGORIAS_LANCAMENTOS_STORAGE_KEY);
                await _storeData(CATEGORIAS_LANCAMENTOS_STORAGE_KEY, JSON.stringify(categorias));
            }

            console.log("Categorias sincronizadas com sucesso!");
        }catch(error){
            console.error(error);
        }
    }

    return {
        criarLancamento: criar,
        consultar,
        consultarCategorias
    };
};