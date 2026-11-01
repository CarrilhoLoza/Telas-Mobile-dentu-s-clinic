// src/config/environment.js
//
// Os valores vêm do arquivo .env, que não é versionado — cada máquina tem o
// seu, porque o endereço da API depende do IP da rede local. Veja .env.example.
//
// O Expo só injeta variáveis com o prefixo EXPO_PUBLIC_, e isso acontece na
// hora de empacotar: ao mudar o .env é preciso reiniciar o Metro com
// `npx expo start --dev-client -c` para limpar o cache.

const endereco = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!endereco) {
  // Falhar aqui é melhor que cair em um endereço padrão errado e virar um
  // "não foi possível conectar ao servidor" difícil de entender.
  throw new Error(
    'EXPO_PUBLIC_API_BASE_URL não definida. Copie o .env.example para .env e preencha o endereço da API.'
  );
}

export const environment = {
  baseUrl: endereco,
  useMock: process.env.EXPO_PUBLIC_USE_MOCK === 'true',
};
