import axios from 'axios';

/**
 * Configuração central da API.
 *
 * ATENÇÃO PARA O BACK-END E AMBIENTE DE DESENVOLVIMENTO:
 * - O aplicativo espera que todas as rotas tenham o prefixo `/api`.
 * - A BASE_URL abaixo aponta para um IP local; ela só funciona se o servidor
 *   estiver ativo na porta 3000 e o dispositivo móvel conseguir acessar esse IP
 *   pela mesma rede Wi-Fi.
 * - Sem uma API disponível nesse endereço, operações como GET /clientes/perfil
 *   e PUT /clientes/perfil falham ou expiram após 15 segundos.
 * - Para testar em emulador Android, normalmente use http://10.0.2.2:3000/api.
 * - Para dispositivo físico, use o IP LAN atual do computador que executa a API.
 * - Em produção, substitua por uma URL HTTPS pública, por exemplo
 *   https://api.dentusclinic.com/api.
 *
 * O front-end envia o JWT em `Authorization: Bearer <token>` quando
 * global.authToken estiver preenchido. As rotas protegidas devem validar esse token.
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
