const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

/** "2026-10-10" -> "Sábado, 10 de Outubro" */
function formatarData(iso) {
  if (!iso) return '';

  const [ano, mes, dia] = iso.split('-').map(Number);
  if (!ano || !mes || !dia) return iso;

  // Montado campo a campo de propósito: new Date('2026-10-10') é
  // interpretado como UTC e pode cair no dia anterior.
  const data = new Date(ano, mes - 1, dia);

  return `${DIAS[data.getDay()]}, ${dia} de ${MESES[mes - 1]}`;
}

/** "07:00:00" -> "07:00" */
function formatarHora(hora) {
  return hora ? hora.slice(0, 5) : '';
}

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
      procedimento: data.nomeServico || 'Consulta',
      dentista: data.nomeDentista ?? '',
      data: formatarData(data.dataConsulta),
      horario: formatarHora(data.horaConsulta),
      // O status que interessa ao paciente é a resposta dele ao aviso
      // (Pendente, Confirmada ou Recusada), não o andamento na clínica.
      status: data.statusConfirmacao ?? 'Pendente',
    });
  }
}
