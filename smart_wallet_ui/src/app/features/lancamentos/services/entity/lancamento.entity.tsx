import { StatusLancamento, TipoLancamento, TipoPagamento } from "../../../../../../../src/context/api/api.tsx";

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
