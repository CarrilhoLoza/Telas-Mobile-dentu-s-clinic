import { useState, useCallback } from 'react';
import { PerfilService } from '../services/PerfilService';

export function usePerfilViewModel() {
  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
    telefone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const carregarPerfil = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dados = await PerfilService.buscar();
      setPerfil(dados);
    } catch (e) {
      setError('Não foi possível carregar o perfil.');
    } finally {
      setLoading(false);
    }
  }, []);

  const setCampo = useCallback((campo, valor) => {
    setPerfil((atual) => ({ ...atual, [campo]: valor }));
  }, []);

  const salvarPerfil = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSucesso(false);

    try {
      const atualizado = await PerfilService.atualizar(perfil);
      setPerfil(atualizado);
      global.paciente = {
        ...(global.paciente ?? {}),
        ...atualizado,
      };
      setSucesso(true);
      return true;
    } catch (e) {
      setError('Não foi possível salvar o perfil.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [perfil]);

  const redefinirSenha = useCallback(
    async ({ senhaAtual, novaSenha, confirmarNovaSenha }) => {
      setError(null);
      setSucesso(false);

      try {
        await PerfilService.redefinirSenha({
          senhaAtual,
          novaSenha,
          confirmarNovaSenha,
        });

        setSucesso(true);
      } catch (e) {
        setError('Não foi possível redefinir a senha.');
      }
    },
    []
  );

  const sair = useCallback(async () => {
    try {
      await PerfilService.logout();
    } finally {
      global.authToken = null;
      global.paciente = null;
    }
  }, []);

  return {
    perfil,
    loading,
    error,
    sucesso,
    setCampo,
    setError,
    carregarPerfil,
    salvarPerfil,
    redefinirSenha,
    sair,
  };
}
