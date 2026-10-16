import * as SecureStore from 'expo-secure-store';

/**
 * Guarda a sessão quando o paciente marca "manter conectado".
 *
 * O token fica no SecureStore, e não no armazenamento comum, porque ele dá
 * acesso aos dados de saúde do paciente: no Android o SecureStore usa o
 * cofre do sistema, protegido por criptografia do próprio aparelho.
 */
const CHAVE = 'sessao-dentus';

export const sessao = {
  async salvar({ token, paciente, expiracao }) {
    await SecureStore.setItemAsync(CHAVE, JSON.stringify({ token, paciente, expiracao }));
  },

  /** Devolve a sessão guardada, ou null se não existir ou já ter vencido. */
  async ler() {
    const guardado = await SecureStore.getItemAsync(CHAVE);
    if (!guardado) return null;

    let dados;
    try {
      dados = JSON.parse(guardado);
    } catch {
      await this.limpar();
      return null;
    }

    // O token tem validade: entrar com um vencido daria erro em toda tela.
    if (dados.expiracao && new Date(dados.expiracao) <= new Date()) {
      await this.limpar();
      return null;
    }

    return dados;
  },

  async limpar() {
    await SecureStore.deleteItemAsync(CHAVE);
  },
};
