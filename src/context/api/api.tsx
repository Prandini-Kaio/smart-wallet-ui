import { createContext, useContext } from "react";
import RequestBase, { verboseAPI } from "../../services/api";
import { showMessage } from "react-native-flash-message";

export enum TipoLancamento{
    ENTRADA = 'ENTRADA', 
    SAIDA = 'SAIDA'
}

export enum TipoPagamento{
    DEBITO = 'DEBITO', 
    CREDITO = 'CREDITO'
}

export interface Lancamento{
    id: number,
    tipoLancamento: TipoLancamento,
    tipoPagamento: TipoPagamento,
    categoriaLancamento: string,
    valor: number,
    conta: string,
    dtCriacao: string,
    parcelas: number,
    descricao: string,
    icone: string
}

export interface Conta {
    id: number,
    nome: string,
    banco: string,
    vencimento: string
}

interface APIContextData {
    getLancamentos(): Promise<Lancamento[]>
    createLancamento(input : Lancamento): Promise<Lancamento>
    createConta(input : Conta): Promise<Conta>
}

const APIContext = createContext<APIContextData>({} as APIContextData)

function APIProvider({ children }: any){

    const getLancamentos = (): Promise<Lancamento[]> => {
        return new Promise<Lancamento[]>((resolve, reject) => {
            RequestBase<Lancamento[]>(verboseAPI.GET, 'lancamento')
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                showMessage({
                    message: error.message || "Falha ao carregar lançamentos.",
                    type: 'danger'
                });
                reject(error);
            })
        })
    }

    const createLancamento = (input: Lancamento) : Promise<Lancamento> => {
        return new Promise<Lancamento>((resolve, reject) => {
            RequestBase<Lancamento>(verboseAPI.POST, "lancamento", input)
            .then((result) => {
                showMessage({
                    message: "Lançamento criado com sucesso",
                    type: 'success'
                });
                resolve(result);
            })
            .catch((e) => {
                showMessage({
                    message: e.message || "Erro ao criar lançamento",
                    type: 'danger'
                });
                reject(e);
            });
        })
    }

    const createConta = (input: Conta) : Promise<Conta> => {
        return new Promise<Conta>((resolve, reject) => {
            RequestBase<Conta>(verboseAPI.POST, "conta", input)
            .then((result) => {
                showMessage({
                    message: "Conta criada com sucesso",
                    type: 'success'
                });
                resolve(result);
            })
            .catch((e) => {
                showMessage({
                    message: "Erro ao criar conta [" + e.message + "]"|| "Erro ao criar conta",
                    type: 'danger'
                });
                reject(e);
            });
        })
    }

    return (
        <APIContext.Provider 
            value={{
                getLancamentos,
                createLancamento,
                createConta
            }}
        >
            {children}
        </APIContext.Provider>
    )
}

const useAPI = () => {
    const context = useContext(APIContext);
    if (!context)
        throw new Error('useAPI  must be used with in APIProvider.');

    return context;
}

export { APIProvider, useAPI };