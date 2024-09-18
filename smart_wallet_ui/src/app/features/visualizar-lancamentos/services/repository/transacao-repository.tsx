import { VerboseAPI, useApiUtils } from "../../../../shared/services/api/api";
import { TotalizadorFinanceiro } from "../../../../shared/services/api/api-context";
import { TransacaoFilter } from "../entity/transacao-entity";

export const useGetTotalizador = () => {
  const { RequestBase } = useApiUtils(); // Aqui está dentro de um hook

  const getTotalizador = (filter: TransacaoFilter): Promise<TotalizadorFinanceiro> => {
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

    return new Promise<TotalizadorFinanceiro>((resolve, reject) => {
      RequestBase<TotalizadorFinanceiro>(VerboseAPI.GET, 'transacao/totalizador', params)
        .then(result => {
          console.log(params)
          resolve(result.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return { getTotalizador };
};