import api, { conteudo } from '../../../services/api';
import { Prontuario } from '../models/Prontuario';

/**
 * Tratamentos do paciente.
 *
 * GET /api/paciente-app/tratamentos
 *
 * Devolve os planos do prontuário do paciente, só na versão atual de cada um —
 * planos são append-only no servidor, e o histórico de versões não é exposto
 * ao paciente.
 *
 * Os dados do paciente vêm da sessão, preenchida no login: não existe (ainda)
 * endpoint de perfil no aplicativo.
 */
export const ProntuarioService = {
  async listar() {
    const response = await api.get('/paciente-app/tratamentos');

    return {
      paciente: global.paciente ?? null,
      prontuarios: conteudo(response).map((plano) => Prontuario.fromApi(plano)),
    };
  },
};
