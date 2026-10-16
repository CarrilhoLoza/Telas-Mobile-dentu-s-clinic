import { useState, useCallback } from 'react';
import { AuthService } from '../services/AuthService';
import { mensagemDeErro } from '../../../services/api';
import { sessao } from '../../../services/sessao';

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
          const resposta = await AuthService.login({ email: email.trim(), senha });

          // O mesmo login atende a clínica toda; só paciente usa este app.
          if (resposta.tipoAcesso !== 'PACIENTE') {
            setError('Este aplicativo é exclusivo para pacientes.');
            return;
          }

          const paciente = {
            id: resposta.id,
            nome: resposta.nome,
            email: email.trim(),
            role: resposta.tipoAcesso,
          };

          global.authToken = resposta.token;
          global.paciente = paciente;

          // Com senha temporária, a API recusa os demais endpoints até que o
          // paciente defina a senha dele.
          if (resposta.primeiroAcesso) {
            navigation.replace('PrimeiroAcesso');
            return;
          }

          // Só guarda a sessão se o paciente pediu. Sem isso, sair do
          // aplicativo encerra a sessão, que é o esperado em celular dividido.
          if (manterLogado) {
            await sessao.salvar({
              token: resposta.token,
              paciente,
              expiracao: resposta.expiracao,
            });
          }

          navigation.replace('Cliente');
        } catch (e) {
          setError(mensagemDeErro(e, 'Não foi possível entrar. Verifique seus dados.'));
        } finally {
          setLoading(false);
        }
      },
      [email, senha, manterLogado]
  );

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
