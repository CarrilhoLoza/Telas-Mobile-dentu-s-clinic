// src/config/environment.js
export const environment = {
  // Troque para true e a tela de consultas volta a usar dados falsos, útil
  // para demonstrar o app sem a API no ar. A tela de prontuários usa mock
  // sempre, porque ainda não existe endpoint para ela.
  useMock: false,

  // 10.0.2.2 é como o emulador Android alcança o localhost do computador.
  // Em aparelho físico, troque pelo IP da máquina na rede e suba a API com
  // --urls http://0.0.0.0:5081, senão ela só aceita conexão local.
  baseUrl: "http://192.168.0.101:5081/api",
};
