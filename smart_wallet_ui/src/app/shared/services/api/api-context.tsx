import { createContext, useContext } from 'react';
import { showMessage } from 'react-native-flash-message';
import { LancamentoFilter, LancamentoResponse } from '../../../features/lancamentos/services/entity/lancamento.entity';
import { TransacaoResponse } from '../../../features/lancamentos/services/entity/transacao.entity';
import { TransacaoFilter } from '../../../features/visualizar-lancamentos/services/entity/transacao-entity';
import { VerboseAPI, useApiUtils } from './api';
import { handleApiError } from '../../utils/errorHandler';

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
  diaVencimento: string;
  saldoParcial: number;
  tipoConta: TipoConta;
  color: string;
}

export interface TotalizadorFinanceiro {
  total: number;
  totalEntrada: number;
  totalSaida: number;
}

interface APIContextData {
  ping(): Promise<boolean>;
  getLancamentos(filter: LancamentoFilter): Promise<LancamentoResponse[]>; 
  getTransacoes(fitler: TransacaoFilter): Promise<TransacaoResponse[]>;
  getTransacoesByLancamento(idLancamento: number): Promise<Transacao[]>;
  getTotalizadorFilter(filter: LancamentoFilter): Promise<TotalizadorFinanceiro>;
  getTotalizadorTransacaoFilter(filter: TransacaoFilter): Promise<TotalizadorFinanceiro>;
  getTotalizadorPeriodo(
    conta: string,
    dtInicio: string,
    dtFim: string,
  ): Promise<TotalizadorFinanceiro>;
  getContas(): Promise<Conta[]>;
  getCategorias(): Promise<string[]>;

  createLancamento(input: LancamentoResponse): Promise<LancamentoResponse>;
  createConta(input: Conta): Promise<Conta>;
  payTransaction(id: string): Promise<TransacaoResponse>;
  payAllTransactions(filter: TransacaoFilter): Promise<TransacaoResponse[]>;
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

  const { RequestBase } = useApiUtils();

  const ping = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      RequestBase(VerboseAPI.GET, 'health/ping')
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

  const getLancamentos = (filter: LancamentoFilter): Promise<LancamentoResponse[]> => {
    return new Promise<LancamentoResponse[]>((resolve, reject) => {
      RequestBase<LancamentoResponse[]>(VerboseAPI.GET, 'lancamento')
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const getTransacoes = (
    filter: TransacaoFilter
  ): Promise<TransacaoResponse[]> => {

    const params = {
      id: filter.id != null ? filter.id.toString() : '',
      idLancamento: filter.idLancamento != null ? filter.idLancamento.toString() : '',
      categoria: filter.categoria,
      tipo: filter.tipo,
      pagamento: filter.pagamento,
      status: filter.status != undefined ? filter.status.toString() : '',
      conta: filter.conta,
      dtInicio: filter.dtInicio,
      dtFim: filter.dtFim
    };

    return new Promise<TransacaoResponse[]>((resolve, reject) => {
      RequestBase<TransacaoResponse[]>(VerboseAPI.GET, 'transacao', params)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const getTransacoesByLancamento = (
    idLancamento: number,
  ): Promise<Transacao[]> => {
    return new Promise<Transacao[]>((resolve, reject) => {
      RequestBase<Transacao[]>(
        VerboseAPI.GET,
        'transacao',
        `idLancamento=${idLancamento}`,
      )
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const getTotalizadorFilter = (
    filter: LancamentoFilter
  ): Promise<TotalizadorFinanceiro> => {

    const params = {
      tipo: filter.tipo,
      categoria: filter.categoria,
      tipoPagamento: filter.tipoPagamento,
      status: filter.status,
      dtInicio: filter.dtInicio,
      dtFim: filter.dtFim,
      conta: filter.conta
    };

    return new Promise<TotalizadorFinanceiro>((resolve, reject) => {
      RequestBase<TotalizadorFinanceiro>(VerboseAPI.GET, 'transacao/totalizador', params)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });

    });
  }

  const getTotalizadorTransacaoFilter = (
    filter: TransacaoFilter
  ): Promise<TotalizadorFinanceiro> => {

    const params = {
      id: filter.id,
      idLancamento: filter.idLancamento,
      categoria: filter.categoria,
      tipo: filter.tipo,
      pagamento: filter.pagamento,
      status: filter.status,
      conta: filter.conta,
      dtInicio: filter.dtInicio,
      dtFim: filter.dtFim
    };

    return new Promise<TotalizadorFinanceiro>((resolve, reject) => {
      RequestBase<TotalizadorFinanceiro>(VerboseAPI.GET, 'transacao/totalizador', params)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });

    });
  }

  const getTotalizadorPeriodo = (
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
        VerboseAPI.GET,
        'transacao/totalizador/periodo',
        params,
      )
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const getContas = (): Promise<Conta[]> => {
    return new Promise<Conta[]>((resolve, reject) => {
      RequestBase<Conta[]>(VerboseAPI.GET, 'conta')
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const getCategorias = (): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
      RequestBase<string[]>(VerboseAPI.GET, 'lancamento/categoria')
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const createLancamento = (input: LancamentoResponse): Promise<LancamentoResponse> => {
    return new Promise<LancamentoResponse>((resolve, reject) => {
      RequestBase<LancamentoResponse>(VerboseAPI.POST, 'lancamento', input)
        .then(result => {
          showMessage({
            message: 'Lançamento criado com sucesso',
            type: 'success',
          });
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const createConta = (input: Conta): Promise<Conta> => {
    return new Promise<Conta>((resolve, reject) => {
      RequestBase<Conta>(VerboseAPI.POST, 'conta', input)
        .then(result => {
          showMessage({
            message: 'Conta criada com sucesso',
            type: 'success',
          });
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const payTransaction = (id: string): Promise<TransacaoResponse> => {
    return new Promise<TransacaoResponse>((resolve, reject) => {

      const params = {
        id: id
      }
      RequestBase<TransacaoResponse>(VerboseAPI.PUT, 'transacao/pagar', params)
        .then(result => {
          showMessage({
            message: `Transacao ${id} paga com sucesso`,
            type: 'success',
          });
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  const payAllTransactions = (filter: TransacaoFilter): Promise<TransacaoResponse[]> => {
    return new Promise<TransacaoResponse[]>((resolve, reject) => {

      const params = {
        id: filter.id != null ? filter.id.toString() : '',
        idLancamento: filter.idLancamento != null ? filter.idLancamento.toString() : '',
        categoria: filter.categoria,
        tipo: filter.tipo,
        pagamento: filter.pagamento,
        status: filter.status != undefined ? filter.status.toString() : '',
        conta: filter.conta,
        dtInicio: filter.dtInicio,
        dtFim: filter.dtFim
      };

      RequestBase<TransacaoResponse[]>(VerboseAPI.PUT, 'transacao/pagar-todos', params)
        .then(result => {
          showMessage({
            message: `Transacoes ${filter.conta} pagas com sucesso`,
            type: 'success',
          });
          resolve(result.data);
        })
        .catch(error => {
          handleApiError(error);
          reject(error);
        });
    });
  };

  return (
    <APIContext.Provider
      value={{
        ping,
        getLancamentos,
        getTransacoes,
        getTransacoesByLancamento,
        getTotalizadorFilter,
        getTotalizadorTransacaoFilter,
        getTotalizadorPeriodo,
        getContas,
        getCategorias,
        createLancamento,
        createConta,
        payTransaction,
        payAllTransactions
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
