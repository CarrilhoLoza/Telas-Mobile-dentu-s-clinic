import api, { conteudo } from '../../../services/api';
import { Paciente } from '../models/Paciente';

/**
 * Perfil do paciente.
 *
 * GET  /api/paciente-app/perfil
 * PUT  /api/paciente-app/perfil          Body: { nome, email, telefone }
 * POST /api/paciente-app/alterar-senha   Body: { senhaAtual, novaSenha }
 *
 * O paciente sempre age sobre o próprio cadastro: o servidor tira o id do
 * token, nunca do corpo da requisição.
 *
 * O e-mail é a credencial de acesso — alterá-lo aqui muda o e-mail usado
 * para entrar no aplicativo.
 */
export const PerfilService = {
  async buscar() {
    const response = await api.get('/paciente-app/perfil');
    return Paciente.fromApi(conteudo(response));
  },

  async atualizar(perfil) {
    const response = await api.put('/paciente-app/perfil', {
      nome: perfil.nome,
      email: perfil.email,
      telefone: perfil.telefone,
    });

    return Paciente.fromApi(conteudo(response));
  },

  async alterarSenha({ senhaAtual, novaSenha }) {
    await api.post('/paciente-app/alterar-senha', { senhaAtual, novaSenha });
  },
};
