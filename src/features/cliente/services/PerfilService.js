import api from '../../../services/api';
import { Paciente } from '../models/Paciente';

/**
 * Integração de perfil do cliente.
 *
 * ATENÇÃO PARA O BACK-END:
 * A tela de Perfil utiliza este serviço para carregar e persistir e-mail e telefone.
 * Sem os endpoints abaixo acessíveis, o aplicativo pode abrir a edição, mas o check
 * não consegue concluir o salvamento porque a requisição HTTP falha ou expira.
 *
 * Autenticação esperada:
 * - Todas as rotas devem aceitar `Authorization: Bearer <JWT>`.
 * - O interceptor em src/services/api.js injeta o token disponível em global.authToken.
 *
 * Contrato comum do perfil:
 * { id, nome, email, telefone }
 * - `id`: identificador do paciente autenticado.
 * - `nome`: nome completo do paciente.
 * - `email`: e-mail atualizado do paciente.
 * - `telefone`: telefone atualizado do paciente.
 *
 * GET /api/clientes/perfil
 * - Retorno esperado: 200 com { id, nome, email, telefone }.
 * - O front-end converte a resposta usando Paciente.fromApi(data).
 *
 * PUT /api/clientes/perfil
 * - Body esperado: { nome, email, telefone }.
 * - Retorno esperado: 200 com o perfil completo e atualizado
 *   { id, nome, email, telefone }.
 * - O retorno atualizado é necessário para que o front-end confirme o salvamento,
 *   atualize o estado local e volte do ícone de check para o ícone de edição.
 *
 * POST /api/clientes/perfil/redefinir-senha
 * - Body esperado: { senhaAtual, novaSenha, confirmarNovaSenha }.
 * - Retorno esperado: 200 ou 204 em caso de sucesso.
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
