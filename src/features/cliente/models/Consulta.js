export class Consulta {
  constructor({ id, procedimento, dentista, data, horario, status }) {
    this.id = id;
    this.procedimento = procedimento;
    this.dentista = dentista;
    this.data = data;
    this.horario = horario;
    this.status = status;
  }

  static fromApi(data) {
    return new Consulta({
      id: data.id,
      procedimento: data.procedimento ?? data.servico ?? '',
      dentista: data.dentista ?? '',
      data: data.data ?? '',
      horario: data.horario ?? '',
      status: data.status ?? 'Pendente',
    });
  }
}
