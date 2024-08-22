import { createContext, useContext } from 'react';
import RequestBase, { verboseAPI } from './api';
import { showMessage } from 'react-native-flash-message';
import { LancamentoResponse } from '../../../features/lancamentos/services/entity/lancamento.entity';

export enum TipoLancamento {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
}

export enum StatusLancamento {
  EM_ABERTO = 'EM_ABERTO',
  QUITADO = 'QUITADO',
}

export enum TipoPagamento {
  DEBITO = 'DEBITO',
  CREDITO = 'CREDITO',
}

export enum TipoConta {
  ECONOMIA = 'ECONOMIA',
  INVESTIMENTO = 'INVESTIMENTO',
  CORRENTE_POUPANCA = 'CORRENTE_POUPANCA',
}

export interface Transacao {
  id: number;
  valor: number;
  dtVencimento: string;
  dtPagamento: string;
  status: string;
  descricao: string;
}

export interface Conta {
  id: number;
  banco: string;
  nome: string;
  dtVencimento: string;
  saldoParcial: number;
  tipoConta: TipoConta;
}

export interface TotalizadorFinanceiro {
  total: number;
  totalEntrada: number;
  totalSaida: number;
}

interface APIContextData {
  ping(): Promise<boolean>;
  getLancamentos(): Promise<LancamentoResponse[]>;
  getTransacoesByLancamento(idLancamento: number): Promise<Transacao[]>;
  getTotalizadorFinanceiro(
    conta: string,
    dtInicio: string,
    dtFim: string,
  ): Promise<TotalizadorFinanceiro>;
  getContas(): Promise<Conta[]>;
  getCategorias(): Promise<string[]>;

  createLancamento(input: LancamentoResponse): Promise<LancamentoResponse>;
  createConta(input: Conta): Promise<Conta>;
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

  const ping = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      RequestBase<string>(verboseAPI.GET, 'health/ping')
        .then(result => {
          resolve(true);
        })
        .catch(error => {
          showMessage({
            message: error.content || 'API fora do ar, verifique a conexão com a internet.',
            type: 'danger',
          });
          reject(false);
        });
    });
  }

  const getLancamentos = (): Promise<LancamentoResponse[]> => {
    return new Promise<LancamentoResponse[]>((resolve, reject) => {
      RequestBase<LancamentoResponse[]>(verboseAPI.GET, 'lancamento/all')
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          showMessage({
            message: error.message || 'Falha ao carregar lançamentos.',
            type: 'danger',
          });
          reject(error);
        });
    });
  };

  const getTransacoesByLancamento = (
    idLancamento: number,
  ): Promise<Transacao[]> => {
    return new Promise<Transacao[]>((resolve, reject) => {
      RequestBase<Transacao[]>(
        verboseAPI.GET,
        'transacao',
        `idLancamento=${idLancamento}`,
      )
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          showMessage({
            message: error.message || 'Falha ao carregar transações.',
            type: 'danger',
          });
          reject(error);
        });
    });
  };

  const getTotalizadorFinanceiro = (
    conta: string,
    dtInicio: string,
    dtFim: string,
  ): Promise<TotalizadorFinanceiro> => {
    const params = new URLSearchParams({
      conta: conta,
      dtInicio: dtInicio,
      dtFim: dtFim,
    });
    return new Promise<TotalizadorFinanceiro>((resolve, reject) => {
      RequestBase<TotalizadorFinanceiro>(
        verboseAPI.GET,
        'transacao/totalizador/periodo',
        params,
      )
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const getContas = (): Promise<Conta[]> => {
    return new Promise<Conta[]>((resolve, reject) => {
      RequestBase<Conta[]>(verboseAPI.GET, 'conta/all')
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const getCategorias = (): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
      RequestBase<string[]>(verboseAPI.GET, 'lancamento/categoria')
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const createLancamento = (input: LancamentoResponse): Promise<LancamentoResponse> => {
    return new Promise<LancamentoResponse>((resolve, reject) => {
      RequestBase<LancamentoResponse>(verboseAPI.POST, 'lancamento', input)
        .then(result => {
          showMessage({
            message: 'Lançamento criado com sucesso',
            type: 'success',
          });
          resolve(result);
        })
        .catch(e => {
          showMessage({
            message: e.message || 'Erro ao criar lançamento',
            type: 'danger',
          });
          reject(e);
        });
    });
  };

  const createConta = (input: Conta): Promise<Conta> => {
    return new Promise<Conta>((resolve, reject) => {
      RequestBase<Conta>(verboseAPI.POST, 'conta', input)
        .then(result => {
          showMessage({
            message: 'Conta criada com sucesso',
            type: 'success',
          });
          resolve(result);
        })
        .catch(e => {
          showMessage({
            message:
              'Erro ao criar conta [' + e.message + ']' ||
              'Erro ao criar conta',
            type: 'danger',
          });
          reject(e);
        });
    });
  };

  return (
    <APIContext.Provider
      value={{
        ping,
        getLancamentos,
        getTransacoesByLancamento,
        getTotalizadorFinanceiro,
        getContas,
        getCategorias,
        createLancamento,
        createConta,
      }}>
      {children}
    </APIContext.Provider>
  );
}

const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI  must be used with in APIProvider.');
  }

  return context;
};

export { APIProvider, useAPI };
