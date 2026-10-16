import { useState, useCallback } from 'react';
import { AuthService } from '../services/AuthService';
import { mensagemDeErro } from '../../../services/api';

export function usePrimeiroAcessoViewModel() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const definirSenha = useCallback(
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
        await AuthService.alterarSenhaInicial(novaSenha);
        navigation.replace('Cliente');
      } catch (e) {
        setError(mensagemDeErro(e, 'Não foi possível definir a senha.'));
      } finally {
        setLoading(false);
      }
    },
    [novaSenha, confirmarNovaSenha]
  );

  return {
    novaSenha,
    confirmarNovaSenha,
    setNovaSenha,
    setConfirmarNovaSenha,
    loading,
    error,
    definirSenha,
  };
}
