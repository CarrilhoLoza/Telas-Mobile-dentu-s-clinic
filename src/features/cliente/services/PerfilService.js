import api from '../../../services/api';
import { Paciente } from '../models/Paciente';

/**
 * Endpoints de perfil do cliente:
 *
 * GET /api/clientes/perfil
 * Response: { id, nome, email, telefone }
 *
 * PUT /api/clientes/perfil
 * Body: { nome, email, telefone }
 * Response: { id, nome, email, telefone }
 *
 * POST /api/clientes/perfil/redefinir-senha
 * Body: { senhaAtual, novaSenha, confirmarNovaSenha }
 * Response: 200 OK
 */
export const PerfilService = {
  async buscar() {
    const { data } = await api.get('/clientes/perfil');
    return Paciente.fromApi(data);
  },

  async atualizar(perfil) {
    const { data } = await api.put('/clientes/perfil', {
      nome: perfil.nome,
      email: perfil.email,
      telefone: perfil.telefone,
    });

    return Paciente.fromApi(data);
  },

  async redefinirSenha({ senhaAtual, novaSenha, confirmarNovaSenha }) {
    await api.post('/clientes/perfil/redefinir-senha', {
      senhaAtual,
      novaSenha,
      confirmarNovaSenha,
    });
  },
};
