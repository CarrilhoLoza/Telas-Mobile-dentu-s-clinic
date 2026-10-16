import { useState, useCallback, useMemo } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { ConsultaService } from '../services/ConsultaService';
import { mensagemDeErro } from '../../../services/api';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Animação suave quando um bloco some ou muda de posição.
const animarLista = () =>
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

export function useConsultasViewModel() {
  const [consultas, setConsultas] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carregarConsultas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // As duas listas vêm de endpoints diferentes: a de cima é acionável
      // (confirmar/recusar), a outra é só leitura.
      const [futuras, anteriores] = await Promise.all([
        ConsultaService.listar(),
        ConsultaService.listarHistorico(),
      ]);
      setConsultas(futuras);
      setHistorico(anteriores);
    } catch (e) {
      setError(mensagemDeErro(e, 'Não foi possível carregar as consultas.'));
    } finally {
      setLoading(false);
    }
  }, []);

  // CONFIRMAR: o bloco continua na lista, mas passa a ter status
  // "Confirmada" e desce para a área abaixo da linha (card branco).
  const confirmarConsulta = useCallback(async (id) => {
    try {
      const resposta = await ConsultaService.confirmar(id);

      animarLista();
      setConsultas((atual) =>
        atual.map((consulta) =>
          consulta.id === id
            ? { ...consulta, ...resposta, status: 'Confirmada' }
            : consulta
        )
      );
    } catch (e) {
      // A API recusa a confirmação a menos de 1h da consulta: a mensagem dela
      // explica o motivo melhor que um texto genérico.
      setError(mensagemDeErro(e, 'Não foi possível confirmar a consulta.'));
    }
  }, []);

  // RECUSAR: o bloco é removido da lista e os demais sobem.
  const recusarConsulta = useCallback(async (id) => {
    try {
      await ConsultaService.recusar(id);

      animarLista();
      setConsultas((atual) => atual.filter((consulta) => consulta.id !== id));
    } catch (e) {
      setError(mensagemDeErro(e, 'Não foi possível recusar a consulta.'));
    }
  }, []);

  // Consultas aguardando resposta (acima da linha).
  const pendentes = useMemo(
    () => consultas.filter((c) => c.status !== 'Confirmada'),
    [consultas]
  );

  // Consultas já confirmadas (abaixo da linha).
  const confirmadas = useMemo(
    () => consultas.filter((c) => c.status === 'Confirmada'),
    [consultas]
  );

  return {
    consultas,
    historico,
    pendentes,
    confirmadas,
    loading,
    error,
    carregarConsultas,
    confirmarConsulta,
    recusarConsulta,
  };
}
