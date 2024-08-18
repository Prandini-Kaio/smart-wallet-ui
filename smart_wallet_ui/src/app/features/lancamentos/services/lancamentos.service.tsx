import { useAPI } from "../../../shared/services/api/api-context";
import { useStorage } from "../../../shared/services/asyncStorage/async.service";
import { LancamentoResponse } from "./entity/lancamento.entity";

export const useLancamentoService = () => {

    const LANCAMENTO_STORAGE_KEY = 'lancamentos';

    const { ping, createLancamento } = useAPI();

    const { _storeData, _retrieveData, _cleanData } = useStorage();

    const criarLancamento = async (lancamento: LancamentoResponse) => {
        console.log("Conexão com API não foi estabelecida, salvando lançamentos.");
        
        const isConnected = await ping();

        if(!isConnected){
            console.log("Iniciando cadastro de lançamentos no storage.");
            await salvarLancamento(lancamento);
            return;
        }

        await createLancamento(lancamento);
        console.log("Lançamento cadastrado com sucesso!");

        await sincronizarLancamentos();
    }

    const salvarLancamento = async (lancamento: LancamentoResponse) => {
        console.log('Iniciando save de lancamento no storage.');

        const lancamentosString = await _retrieveData(LANCAMENTO_STORAGE_KEY);
        const lancamentos = lancamentosString ? JSON.parse(lancamentosString) : [];

        lancamentos.push(lancamento);

        await _storeData(LANCAMENTO_STORAGE_KEY, JSON.stringify(lancamento));
    }

    const sincronizarLancamentos = async () => {
        console.log("Iniciando sincronia de lançamentos com a API.");
        const lancamentosString = await _retrieveData(LANCAMENTO_STORAGE_KEY);


        if (lancamentosString) {
            const lancamentosStorage: LancamentoResponse[] = JSON.parse(lancamentosString);

            for (let index = 0; index < lancamentosStorage.length; index++) {
                const element = lancamentosStorage[index];
                await createLancamento(element);
            }

            await _cleanData(LANCAMENTO_STORAGE_KEY);


            console.log("Lançamentos sincronizados com sucesso!");

            return;
        }

        console.log("Nenhum lançamento pendente foi encontrado.");

        return;
    };

    return {
        criarLancamento
    };
};