export class Prontuario {
  constructor({ id, data, status, procedimento, dentista, descricao, documentoTitulo }) {
    this.id = id;
    this.data = data;
    this.status = status;
    this.procedimento = procedimento;
    this.dentista = dentista;
    this.descricao = descricao;
    this.documentoTitulo = documentoTitulo;
  }

  static fromApi(data) {
    return new Prontuario({
      id: data.id,
      data: data.data ?? '',
      status: data.status ?? 'Concluído',
      procedimento: data.procedimento ?? data.servico ?? '',
      dentista: data.dentista ?? '',
      descricao: data.descricao ?? '',
      documentoTitulo: data.documentoTitulo ?? 'Documento do atendimento',
    });
  }
}
