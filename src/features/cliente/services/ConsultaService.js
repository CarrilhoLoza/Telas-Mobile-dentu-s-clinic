// src/features/cliente/services/ConsultaService.js
import api, { conteudo } from '../../../services/api';
import { environment } from '../../../config/environment';
import { consultasMock } from '../mocks/consultasMock';
import { Consulta } from '../models/Consulta';

/**
 * Endpoints de consultas do paciente:
 *
 * GET  /api/paciente-app/consultas-futuras
 * POST /api/paciente-app/consultas/:id/confirmar
 * POST /api/paciente-app/consultas/:id/recusar
 *
 * Confirmar e recusar não devolvem a consulta, apenas uma mensagem. A recusa
 * cancela a consulta no servidor, e ela deixa de aparecer na listagem.
 *
 * A API recusa as duas ações a menos de 1 hora do horário marcado, e em
 * consulta já realizada ou cancelada.
 */
export const ConsultaService = {
  async listar() {
    if (environment.useMock) {
      return consultasMock;
    }

    const response = await api.get('/paciente-app/consultas-futuras');
    return conteudo(response).map((item) => Consulta.fromApi(item));
  },

  /** Consultas que já passaram do horário ou foram encerradas pela clínica. */
  async listarHistorico() {
    if (environment.useMock) {
      return [];
    }

    const response = await api.get('/paciente-app/historico');
    return conteudo(response).map((item) => Consulta.fromApi(item));
  },

  async confirmar(id) {
    if (environment.useMock) {
      return {
        id,
        status: 'Confirmada',
      };
    }

    await api.post(`/paciente-app/consultas/${id}/confirmar`);
  },

  async recusar(id) {
    if (environment.useMock) {
      return {
        id,
        status: 'Recusada',
      };
    }

    await api.post(`/paciente-app/consultas/${id}/recusar`);
  },
};
