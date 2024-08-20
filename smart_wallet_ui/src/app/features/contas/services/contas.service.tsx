import {useAPI} from '../../../shared/services/api/api-context.tsx';
import { formatDate } from '../../lancamentos/services/usecases/date-utils.service.tsx';
import {TotalizadorGastos} from '../entities/conta.entity.tsx';

const getMonthData = (date: Date) => {
  const dtInicio = new Date(date.getFullYear(), date.getMonth(), 1);
  const dtFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const monthName = dtInicio.toLocaleString('default', {month: 'long'});

  return {dtInicio, dtFim, monthName};
};

const currentDate = new Date();
const {
  dtInicio: dtInicioAtual,
  dtFim: dtFimAtual,
  monthName: monthAtual,
} = getMonthData(currentDate);

const {
  dtInicio: dtInicioAnterior,
  dtFim: dtFimAnterior,
  monthName: monthAnterior,
} = getMonthData(
  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
);

const {
  dtInicio: dtInicioProximo,
  dtFim: dtFimProximo,
  monthName: monthProximo,
} = getMonthData(
  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
);

export const useResumoFinanceiro = () => {
  const {getTotalizadorFinanceiro} = useAPI();

  const getMonthData = (date: Date) => {
    const dtInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    const dtFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const monthName = dtInicio.toLocaleString('default', {month: 'long'});
    return {dtInicio, dtFim, monthName};
  };

  const fetchResumoFinanceiro = async () => {
    const currentDate = new Date();

    const {
      dtInicio: dtInicioAtual,
      dtFim: dtFimAtual,
      monthName: monthAtual,
    } = getMonthData(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const {
      dtInicio: dtInicioAnterior,
      dtFim: dtFimAnterior,
      monthName: monthAnterior,
    } = getMonthData(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    );

    const {
      dtInicio: dtInicioProximo,
      dtFim: dtFimProximo,
      monthName: monthProximo,
    } = getMonthData(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1),
    );

    const [totalAtual, totalAnterior, totalProximo] = await Promise.all([
      getTotalizadorFinanceiro(
        '',
        formatDate(dtInicioAtual),
        formatDate(dtFimAtual),
      ),
      getTotalizadorFinanceiro(
        '',
        formatDate(dtInicioAnterior),
        formatDate(dtFimAnterior),
      ),
      getTotalizadorFinanceiro(
        '',
        formatDate(dtInicioProximo),
        formatDate(dtFimProximo),
      ),
    ]);

    const total: TotalizadorGastos = {
      totalAtual: totalAtual.totalSaida,
      totalAnterior: totalAnterior.totalSaida,
      totalProximo: totalProximo.totalSaida,

      mesAtual: monthAtual,
      mesAnterior: monthAnterior,
      proximoMes: monthProximo,
    };

    return total;
  };

  return {fetchResumoFinanceiro};
};
