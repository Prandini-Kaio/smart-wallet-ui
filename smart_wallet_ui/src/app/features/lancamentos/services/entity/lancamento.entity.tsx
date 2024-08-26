import { StatusLancamento, TipoLancamento, TipoPagamento } from "../../../../shared/services/api/api-context";

export type LancamentoResponse = {
  id: number;
  tipoLancamento: TipoLancamento;
  tipoPagamento: TipoPagamento;
  categoriaLancamento: string;
  status: StatusLancamento;
  valor: number;
  dtCriacao: string;
  dtAlteracaoStatus: string;
  parcelas: number;
  conta: string;
  descricao: string;
  icone: string;
};

export type LancamentoFilter = {
  tipo: TipoLancamento | string;
  categoria: string;
  tipoPagamento: TipoPagamento | string;
  status: StatusLancamento | string;
  dtInicio: string;
  dtFim: string;
  conta: string;
}
