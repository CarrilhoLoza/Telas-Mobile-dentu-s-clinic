import { useState, useCallback } from 'react';
import { ProntuarioService } from '../services/ProntuarioService';

export function useProntuariosViewModel() {
  const [paciente, setPaciente] = useState(null);
  const [prontuarios, setProntuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carregarProntuarios = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const resposta = await ProntuarioService.listar();

      setPaciente(resposta.paciente);
      setProntuarios(resposta.prontuarios);
    } catch (e) {
      setError('Não foi possível carregar seu prontuário.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    paciente,
    prontuarios,
    loading,
    error,
    carregarProntuarios,
  };
}
