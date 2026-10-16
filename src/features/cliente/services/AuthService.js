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

  logout() {
    global.authToken = null;
    global.paciente = null;
  },
};
