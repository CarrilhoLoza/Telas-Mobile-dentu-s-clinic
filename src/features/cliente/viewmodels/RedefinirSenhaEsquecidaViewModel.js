import { useState, useCallback } from 'react';
import { AuthService } from '../services/AuthService';
import { mensagemDeErro } from '../../../services/api';

export function useRedefinirSenhaEsquecidaViewModel(email) {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redefinirSenha = useCallback(
    async (navigation) => {
      setError(null);

      if (novaSenha.trim().length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres.');
        return;
      }

      if (novaSenha !== confirmarNovaSenha) {
        setError('As senhas não conferem.');
        return;
      }

      setLoading(true);

      try {
        await AuthService.redefinirSenhaEsquecida(email, novaSenha);
        // Sem token (o usuário não estava logado): volta pro login pra
        // entrar já com a senha nova.
        navigation.replace('Login');
      } catch (e) {
        setError(mensagemDeErro(e, 'Não foi possível redefinir a senha.'));
      } finally {
        setLoading(false);
      }
    },
    [email, novaSenha, confirmarNovaSenha]
  );

  return {
    novaSenha,
    confirmarNovaSenha,
    setNovaSenha,
    setConfirmarNovaSenha,
    loading,
    error,
    redefinirSenha,
  };
}
