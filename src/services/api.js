import axios from 'axios';
import { environment } from '../config/environment';

/**
 * Configuração central da API.
 *
 * O endereço vem de src/config/environment.js — é o único lugar a alterar
 * para apontar para outra máquina ou para produção.
 *
 * A API responde num envelope { sucesso, mensagem, dados }, então o conteúdo
 * útil está sempre em `dados`. Use o helper `conteudo` abaixo em vez de ler
 * `response.data` direto.
 *
 * O token JWT é enviado em `Authorization: Bearer <token>` quando
 * global.authToken estiver preenchido.
 */
const api = axios.create({
  baseURL: environment.baseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = global.authToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      global.authToken = null;
    }

    return Promise.reject(error);
  }
);

/** Desembrulha o envelope da API. */
export function conteudo(response) {
  return response.data?.dados ?? response.data;
}

/**
 * Extrai a mensagem de erro da API. Ela chega em `mensagem` quando o próprio
 * controller recusa a operação, e em `error` quando a recusa vem do banco e
 * passa pelo middleware de erros.
 */
export function mensagemDeErro(erro, padrao = 'Não foi possível concluir a operação.') {
  const corpo = erro.response?.data;

  if (Array.isArray(corpo?.error) && corpo.error.length > 0) return corpo.error.join('\n');
  if (corpo?.mensagem) return corpo.mensagem;
  if (Array.isArray(corpo?.erros) && corpo.erros.length > 0) return corpo.erros.join('\n');
  if (erro.code === 'ECONNABORTED' || !erro.response) {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão.';
  }

  return padrao;
}

export default api;
