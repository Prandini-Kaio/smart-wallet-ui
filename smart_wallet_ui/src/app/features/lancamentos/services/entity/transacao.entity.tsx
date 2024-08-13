export interface TransacaoResponse {
    id: number,
    valor: number,
    dtVencimento: string,
    dtPagamento: string,
    status: string,
    descricao: string
}

export interface TransacaoProps {
    transacao: TransacaoResponse
}