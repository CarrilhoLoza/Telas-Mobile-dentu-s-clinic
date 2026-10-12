import { useState, useCallback } from 'react';
import { PerfilService } from '../services/PerfilService';

export function usePerfilViewModel() {
  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
    telefone: '',
  });
  const [carregandoPerfil, setCarregandoPerfil] = useState(false);
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const [error, setError] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const carregarPerfil = useCallback(async () => {
    setCarregandoPerfil(true);
    setError(null);

    try {
      const dados = await PerfilService.buscar();
      setPerfil(dados);
    } catch (e) {
      setError('Não foi possível carregar o perfil.');
    } finally {
      setCarregandoPerfil(false);
    }
  }, []);

  const setCampo = useCallback((campo, valor) => {
    setPerfil((atual) => ({ ...atual, [campo]: valor }));
  }, []);

  const salvarPerfil = useCallback(async () => {
    if (salvandoPerfil) {
      return false;
    }

    setSalvandoPerfil(true);
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
      setSalvandoPerfil(false);
    }
  }, [perfil, salvandoPerfil]);

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
    carregandoPerfil,
    salvandoPerfil,
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
