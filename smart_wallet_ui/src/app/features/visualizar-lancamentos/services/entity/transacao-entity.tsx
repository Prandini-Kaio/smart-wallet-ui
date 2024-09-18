import { TipoLancamento, TipoPagamento } from "../../../../shared/services/api/api-context"

export enum StatusTransacaoEnum{
    PENDENTE,
    PAGO,
    ATRASADO,
    CANCELADO
}

export type TransacaoFilter = {
    id: number | null,
    idLancamento: number| null,
    categoria: string,
    tipo: TipoLancamento | string,
    pagamento: TipoPagamento | string,
    status: StatusTransacaoEnum | string,
    conta: string,
    dtInicio: string,
    dtFim: string
}