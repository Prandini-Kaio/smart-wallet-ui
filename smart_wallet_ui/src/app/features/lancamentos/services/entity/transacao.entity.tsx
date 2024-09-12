import { StatusTransacaoEnum } from "../../../visualizar-lancamentos/services/entity/transacao-entity";
import { LancamentoResponse } from "./lancamento.entity";

export interface TransacaoResponse {
    id: number,
    valor: number,
    dtVencimento: string,
    dtPagamento: string,
    status: StatusTransacaoEnum,
    descricao: string,
    lancamento: LancamentoResponse;
}

export interface TransacaoProps {
    transacao: TransacaoResponse,
    onPress: any
}