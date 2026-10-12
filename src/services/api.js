import axios from 'axios';

/**
 * Configuração central da API.
 *
 * Altere BASE_URL conforme o ambiente:
 * - Emulador Android: http://10.0.2.2:3000
 * - Dispositivo físico: use o IP local do computador, ex.: http://192.168.0.10:3000
 * - Produção: https://api.dentusclinic.com
 */
const BASE_URL = 'http://192.168.3.5:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para enviar o token JWT, quando existir.
api.interceptors.request.use((config) => {
  const token = global.authToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor para tratar sessão expirada.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      global.authToken = null;
    }

    return Promise.reject(error);
  }
);

export default api;
