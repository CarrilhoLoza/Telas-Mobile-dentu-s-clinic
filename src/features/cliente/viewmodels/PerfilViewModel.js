import { useState, useCallback } from 'react';
import { PerfilService } from '../services/PerfilService';
import { AuthService } from '../services/AuthService';
import { mensagemDeErro } from '../../../services/api';
import { sessao } from '../../../services/sessao';

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
      setError(mensagemDeErro(e, 'Não foi possível carregar o perfil.'));
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
      // O e-mail é único no sistema; a mensagem do servidor explica melhor.
      setError(mensagemDeErro(e, 'Não foi possível salvar o perfil.'));
      return false;
    } finally {
      setSalvandoPerfil(false);
    }
  }, [perfil, salvandoPerfil]);

  const redefinirSenha = useCallback(
    async ({ senhaAtual, novaSenha, confirmarNovaSenha }) => {
      setError(null);
      setSucesso(false);

      if (novaSenha.trim().length < 6) {
        setError('A nova senha deve ter no mínimo 6 caracteres.');
        return;
      }

      // A confirmação é conferida aqui: o servidor recebe só a senha nova.
      if (novaSenha !== confirmarNovaSenha) {
        setError('As senhas não conferem.');
        return;
      }

      try {
        await PerfilService.alterarSenha({ senhaAtual, novaSenha });
        setSucesso(true);
      } catch (e) {
        setError(mensagemDeErro(e, 'Não foi possível redefinir a senha.'));
      }
    },
    []
  );

  // Sair precisa apagar a sessão guardada, senão o aplicativo volta a entrar
  // sozinho na próxima abertura. Não existe logout no servidor: o token é sem
  // estado e simplesmente expira.
  const sair = useCallback(async () => {
    try {
      await sessao.limpar();
    } finally {
      AuthService.logout();
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
