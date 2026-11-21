import api, { conteudo } from '../../../services/api';

/**
 * Endpoints de autenticação do paciente.
 *
 * POST /api/auth/login
 * Body: { email, senha }
 * Dados: { id, token, tipoAcesso, nome, primeiroAcesso, expiracao }
 *
 * POST /api/paciente-app/alterar-senha-inicial
 * Header: Authorization: Bearer <token>
 * Body: { novaSenha }
 *
 * Enquanto primeiroAcesso for true, a API recusa os demais endpoints do
 * aplicativo: definir a senha é obrigatório antes de usar o resto.
 *
 * POST /api/auth/esqueci-senha/verificar
 * Body: { email }
 * Confirma que o e-mail existe, antes de pedir a nova senha (não exige login).
 *
 * POST /api/auth/esqueci-senha/redefinir
 * Body: { email, novaSenha }
 * Troca a senha direto a partir do e-mail, sem confirmação adicional (não
 * exige login nem código de verificação).
 *
 * Não existe logout no servidor — o token é sem estado e simplesmente expira.
 */
export const AuthService = {
  async login({ email, senha }) {
    const response = await api.post('/auth/login', { email, senha });
    return conteudo(response);
  },

  async alterarSenhaInicial(novaSenha) {
    await api.post('/paciente-app/alterar-senha-inicial', { novaSenha });
  },

  async verificarEmailEsqueciSenha(email) {
    await api.post('/auth/esqueci-senha/verificar', { email });
  },

  async redefinirSenhaEsquecida(email, novaSenha) {
    await api.post('/auth/esqueci-senha/redefinir', { email, novaSenha });
  },

  logout() {
    global.authToken = null;
    global.paciente = null;
  },
};
