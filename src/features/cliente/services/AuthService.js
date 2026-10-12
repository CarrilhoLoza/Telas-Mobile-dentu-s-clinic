import api from '../../../services/api';

/**
 * Endpoints de autenticação:
 *
 * POST /api/auth/login
 * Body: { email, senha, manterLogado }
 * Response: { token, paciente: { id, nome, email, telefone } }
 *
 * POST /api/auth/logout
 * Header: Authorization: Bearer <token>
 * Response: 204 No Content
 *
 * POST /api/auth/recuperar-senha
 * Body: { email }
 * Response: 200 OK
 */
export const AuthService = {
  async login({ email, senha, manterLogado }) {
    const { data } = await api.post('/auth/login', {
      email,
      senha,
      manterLogado,
    });

    return data;
  },

  async logout() {
    await api.post('/auth/logout');
  },

  async recuperarSenha(email) {
    await api.post('/auth/recuperar-senha', { email });
  },
};
