import { useState, useCallback } from 'react';
import { AuthService } from '../services/AuthService';
import { mensagemDeErro } from '../../../services/api';

export function useEsqueciSenhaViewModel() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verificarEmail = useCallback(
    async (navigation) => {
      setError(null);

      if (!email.trim()) {
        setError('Informe seu e-mail para continuar.');
        return;
      }

      setLoading(true);

      try {
        await AuthService.verificarEmailEsqueciSenha(email.trim());
        navigation.navigate('RedefinirSenhaEsquecida', { email: email.trim() });
      } catch (e) {
        setError(mensagemDeErro(e, 'Não foi possível verificar o e-mail.'));
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return {
    email,
    setEmail,
    loading,
    error,
    verificarEmail,
  };
}
