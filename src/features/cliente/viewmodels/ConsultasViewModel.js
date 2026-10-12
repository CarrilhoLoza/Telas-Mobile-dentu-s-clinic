import { useState, useCallback } from 'react';
import { ConsultaService } from '../services/ConsultaService';

export function useConsultasViewModel() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carregarConsultas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dados = await ConsultaService.listar();
      setConsultas(dados);
    } catch (e) {
      setError('Não foi possível carregar as consultas.');
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmarConsulta = useCallback(async (id) => {
    try {
      const atualizada = await ConsultaService.confirmar(id);

      setConsultas((atual) =>
        atual.map((consulta) =>
          consulta.id === id ? atualizada : consulta
        )
      );
    } catch (e) {
      setError('Não foi possível confirmar a consulta.');
    }
  }, []);

  const recusarConsulta = useCallback(async (id) => {
    try {
      const atualizada = await ConsultaService.recusar(id);

      setConsultas((atual) =>
        atual.map((consulta) =>
          consulta.id === id ? atualizada : consulta
        )
      );
    } catch (e) {
      setError('Não foi possível recusar a consulta.');
    }
  }, []);

  return {
    consultas,
    loading,
    error,
    carregarConsultas,
    confirmarConsulta,
    recusarConsulta,
  };
}
