import api from '../../../services/api';
import { Prontuario } from '../models/Prontuario';
import { Paciente } from '../models/Paciente';

/**
 * Endpoints de prontuário do cliente:
 *
 * GET /api/prontuarios/cliente
 * Response:
 * {
 *   "paciente": { "id", "nome", "email", "telefone" },
 *   "prontuarios": [
 *     {
 *       "id", "data", "status", "procedimento",
 *       "dentista", "descricao", "documentoTitulo"
 *     }
 *   ]
 * }
 */
export const ProntuarioService = {
  async listar() {
    const { data } = await api.get('/prontuarios/cliente');

    return {
      paciente: Paciente.fromApi(data.paciente ?? {}),
      prontuarios: (data.prontuarios ?? []).map(Prontuario.fromApi),
    };
  },
};
