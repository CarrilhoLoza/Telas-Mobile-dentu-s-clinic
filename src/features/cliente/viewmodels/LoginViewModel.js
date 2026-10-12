import { useState, useCallback } from 'react';
// import { AuthService } from '../services/AuthService';

export function useLoginViewModel() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [manterLogado, setManterLogado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setCampo = useCallback((campo, valor) => {
    if (campo === 'email') setEmail(valor);
    if (campo === 'senha') setSenha(valor);
    if (campo === 'manterLogado') setManterLogado(valor);
  }, []);

  const entrar = useCallback(
      async (navigation) => {
        setError(null);

        if (!email.trim() || !senha.trim()) {
          setError('Informe e-mail e senha para continuar.');
          return;
        }

        setLoading(true);

        try {
          // MODO DE TESTE:
          // Não chama o back-end neste momento.
          // Qualquer e-mail e senha preenchidos liberam o acesso.

          await new Promise((resolve) => setTimeout(resolve, 600));

          global.authToken = 'token-mock-dentus-clinic';

          global.paciente = {
            id: 1,
            nome: 'João Victor Carrilho Loza',
            email: email.trim(),
            telefone: '(11) 99999-9999',
            role: 'PACIENTE',
          };

          navigation.replace('Cliente');
        } catch (e) {
          setError('Não foi possível iniciar a sessão de teste.');
        } finally {
          setLoading(false);
        }
      },
      [email, senha]
  );

  // =================================================
  //    BLOCO REAL COMENTADO PARA UTILIZAÇÃO DO MOCK ACIMA
  // =================================================
  //
  //
  // const entrar = useCallback(
  //   async (navigation) => {
  //     setError(null);
  //
  //     if (!email.trim() || !senha.trim()) {
  //       setError('Informe e-mail e senha.');
  //       return;
  //     }
  //
  //     setLoading(true);
  //
  //     try {
  //       const resposta = await AuthService.login({
  //         email,
  //         senha,
  //         manterLogado,
  //       });
  //
  //       global.authToken = resposta.token;
  //       global.paciente = resposta.paciente;
  //
  //       navigation.replace('Cliente');
  //     } catch (e) {
  //       setError(
  //         e.response?.data?.message ??
  //           'Não foi possível entrar. Verifique seus dados.'
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [email, senha, manterLogado]
  // );

  return {
    email,
    senha,
    manterLogado,
    loading,
    error,
    setCampo,
    entrar,
  };
}
