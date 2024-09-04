import { LancamentoResponse } from "./lancamento.entity";

export interface TransacaoResponse {
    id: number,
    valor: number,
    dtVencimento: string,
    dtPagamento: string,
    status: string,
    descricao: string,
    lancamento: LancamentoResponse;
}

export interface TransacaoProps {
    transacao: TransacaoResponse
}