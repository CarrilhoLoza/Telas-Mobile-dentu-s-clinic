/** "2026-10-10" -> "10/10/2026" */
function formatarData(iso) {
  if (!iso) return '';
  const [ano, mes, dia] = iso.split('-');
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : iso;
}

const STATUS = {
  Ativo: 'Em andamento',
  Concluido: 'Concluído',
  Cancelado: 'Cancelado',
};

export class Prontuario {
  constructor({
    id,
    data,
    status,
    procedimento,
    dentista,
    descricao,
    condicao,
    planejamento,
    realizado,
    dentesTratados,
    documentoTitulo,
  }) {
    this.id = id;
    this.data = data;
    this.status = status;
    this.procedimento = procedimento;
    this.dentista = dentista;
    this.descricao = descricao;
    this.condicao = condicao;
    this.planejamento = planejamento;
    this.realizado = realizado;
    this.dentesTratados = dentesTratados;
    this.documentoTitulo = documentoTitulo;
  }

  /** Recebe um plano de tratamento da API. O que o aplicativo chama de
   * "prontuário" é cada plano do prontuário do paciente. */
  static fromApi(plano) {
    return new Prontuario({
      id: plano.id,
      data: formatarData(plano.dataAtualizacao ?? plano.dataCriacao),
      status: STATUS[plano.status] ?? plano.status ?? '',
      procedimento: plano.nomeServico || 'Tratamento',
      // Registros anteriores ao campo não têm dentista; a tela omite quando vazio.
      dentista: plano.nomeDentista ?? '',
      descricao: plano.descricao ?? '',
      condicao: plano.condicao ?? '',
      // O plano é, ele próprio, o planejamento do tratamento.
      planejamento: plano.descricao ?? '',
      realizado: plano.observacao ? [plano.observacao] : [],
      // O campo guarda os dentes separados por vírgula quando o tratamento
      // envolve mais de um, por isso vira lista.
      dentesTratados: (plano.dente ?? '')
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean),
      documentoTitulo: 'Ver detalhes do tratamento',
    });
  }
}
