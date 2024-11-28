import { useAPI } from '../../../shared/services/api/api-context.tsx';
import { _cleanData, _retrieveData, _storeData } from '../../../shared/services/asyncStorage/async.service.tsx';
import { formatDate } from '../../lancamentos/services/usecases/date-utils.service.tsx';
import { TotalizadorGastos } from '../entities/conta.entity.tsx';

const getMonthData = (date: Date) => {
  const dtInicio = new Date(date.getFullYear(), date.getMonth(), 1);
  const dtFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const monthName = dtInicio.toLocaleString('default', { month: 'long' });

  return { dtInicio, dtFim, monthName };
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

export const useContaService = () => {

  const CONTAS_STORAGE_KEY = "contas";

  const { getContas } = useAPI();


  const consultarContas = async () => {
    console.log("Iniciando consulta de contas.");

    await sincronizarContas(); // Sincroniza as categorias

    const contasString = await _retrieveData(CONTAS_STORAGE_KEY);

    if (!contasString) {
      return [];
    }

    try {
      const contas = JSON.parse(contasString);
      return contas;
    } catch (error) {
      console.error("Erro ao parsear contas:", error);
      return [];
    }
  }

  const sincronizarContas = async () => {
    console.log("Iniciando sincronia de categorias.");

        try {
            const contas = await getContas();
            
            if(contas){
                await _cleanData(CONTAS_STORAGE_KEY);
                await _storeData(CONTAS_STORAGE_KEY, JSON.stringify(contas));
            }

            console.log("Contas sincronizadas com sucesso!");
        }catch(error){
            console.error(error);
        }
  }

  return {
    consultarContas,
  }
}

export const useResumoFinanceiro = () => {
  const { getTotalizadorPeriodo } = useAPI();

  const getMonthData = (date: Date) => {
    const dtInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    const dtFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const monthName = dtInicio.toLocaleString('default', { month: 'long' });
    return { dtInicio, dtFim, monthName };
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
      getTotalizadorPeriodo(
        '',
        formatDate(dtInicioAtual),
        formatDate(dtFimAtual),
      ),
      getTotalizadorPeriodo(
        '',
        formatDate(dtInicioAnterior),
        formatDate(dtFimAnterior),
      ),
      getTotalizadorPeriodo(
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

  return { fetchResumoFinanceiro };
};