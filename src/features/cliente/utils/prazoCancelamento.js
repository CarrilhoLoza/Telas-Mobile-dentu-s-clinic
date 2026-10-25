// src/features/cliente/utils/prazoCancelamento.js

const MESES = {
  janeiro: 0,
  fevereiro: 1,
  marco: 2,
  março: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
};

/**
 * Converte data ('Segunda, 21 de Setembro' ou '21/09/2026') e horario ('21:30') em Date.
 * Se o ano não for informado na string, assume o ano atual.
 */
export function parseDataConsulta(dataStr, horarioStr) {
  if (!dataStr || !horarioStr) return null;

  const [horas, minutos] = horarioStr.split(':').map(Number);
  if (isNaN(horas) || isNaN(minutos)) return null;

  // Formato DD/MM/YYYY
  const formatoBarra = dataStr.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
  if (formatoBarra) {
    const dia = parseInt(formatoBarra[1], 10);
    const mes = parseInt(formatoBarra[2], 10) - 1;
    const ano = formatoBarra[3] ? parseInt(formatoBarra[3], 10) : new Date().getFullYear();
    return new Date(ano, mes, dia, horas, minutos);
  }

  // Formato extenso: "Segunda, 21 de Setembro" ou "21 de Setembro de 2026"
  const matchExtenso = dataStr.toLowerCase().match(/(\d{1,2})\s+de\s+([a-zç]+)(?:\s+de\s+(\d{4}))?/);
  if (matchExtenso) {
    const dia = parseInt(matchExtenso[1], 10);
    const nomeMes = matchExtenso[2];
    const mes = MESES[nomeMes];
    if (mes === undefined) return null;

    const anoAtual = new Date().getFullYear();
    const ano = matchExtenso[3] ? parseInt(matchExtenso[3], 10) : anoAtual;
    return new Date(ano, mes, dia, horas, minutos);
  }

  // Fallback ISO
  const isoCandidate = new Date(`${dataStr}T${horarioStr}:00`);
  return isNaN(isoCandidate.getTime()) ? null : isoCandidate;
}

/**
 * Retorna true se a consulta estiver a pelo menos 24 horas a partir de agora.
 * Se a data não puder ser parseada, adota política permissiva (retorna true).
 */
export function podeCancelarConsulta(item, antecedenciaMinimaHoras = 24) {
  if (!item) return false;
  const dataConsulta = parseDataConsulta(item.data, item.horario);
  if (!dataConsulta) return true;

  const diffMs = dataConsulta.getTime() - Date.now();
  const diffHoras = diffMs / (1000 * 60 * 60);
  return diffHoras >= antecedenciaMinimaHoras;
}
