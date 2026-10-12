import { prontuarioResponseMock } from '../mocks/prontuariosMock';
import { Prontuario } from '../models/Prontuario';
import { Paciente } from '../models/Paciente';

const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Serviço temporariamente mockado.
 *
 * Quando o back-end estiver disponível, substitua o corpo de `listar`
 * pela chamada real:
 *
 * const { data } = await api.get('/prontuarios/cliente');
 */
export const ProntuarioService = {
  async listar() {
    await delay();

    return {
      paciente: Paciente.fromApi(prontuarioResponseMock.paciente),
      prontuarios: prontuarioResponseMock.prontuarios.map(Prontuario.fromApi),
    };
  },
};
