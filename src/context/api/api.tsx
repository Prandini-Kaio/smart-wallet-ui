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
    conta: string,
    banco: string,
    vencimento: string,
    color: string
}

interface APIContextData {
    getLancamentos(): Promise<Lancamento[]>
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
                    message: error  ,
                    type: "danger"
                })
            })
        })
    }

    return (
        <APIContext.Provider 
            value={{
                getLancamentos
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