// src/features/cliente/services/ConsultaService.js
import api from '../../../services/api';
import { environment } from '../../../config/environment';
import { consultasMock } from '../mocks/consultasMock';


/**
 * Endpoints de consultas do cliente:
 *
 * GET /api/consultas/cliente
 * Response: [{ id, procedimento, dentista, data, horario, status }]
 *
 * POST /api/consultas/:id/confirmar
 * Response: { id, status: "Confirmada" }
 *
 * POST /api/consultas/:id/recusar
 * Response: { id, status: "Recusada" }
 */

export const ConsultaService = {
  async listar() {
    if (environment.useMock) {
      return consultasMock;
    }

    const response = await api.get('/consultas/minhas');
    return response.data.data;
  },

  async confirmar(id) {
    if (environment.useMock) {
      return {
        id,
        status: 'Confirmada',
      };
    }

    const response = await api.put(`/consultas/${id}/confirmar`);
    return response.data.data;
  },

  async recusar(id) {
    if (environment.useMock) {
      return {
        id,
        status: 'Recusada',
      };
    }

    const response = await api.put(`/consultas/${id}/recusar`);
    return response.data.data;
  },
};