import RequestBase, { verboseAPI } from "../../../../shared/services/api/api";
import { TotalizadorFinanceiro } from "../../../../shared/services/api/api-context";
import { TransacaoFilter } from "../entity/transacao-entity";

export const getTotalizador = 
(filter: TransacaoFilter): Promise<TotalizadorFinanceiro> => {
    const params = new URLSearchParams({
        id: filter.id != null ? filter.id.toString() : '',
        categoria: filter.categoria,
        tipo: filter.tipo,
        pagamento: filter.pagamento,
        status: filter.status.toString(),
        conta: filter.conta,
        dtInicio: filter.dtInicio,
        dtFim: filter.dtFim
      });

      return new Promise<TotalizadorFinanceiro>((resolve, reject) => {
        RequestBase<TotalizadorFinanceiro>(verboseAPI.GET, 'transacao/totalizador', params)
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        })
      });
}