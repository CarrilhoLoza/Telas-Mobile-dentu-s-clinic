export const pacienteMock = {
  id: 1,
  nome: 'João Victor Carrilho Loza',
  email: 'joao.victor@dentusclinic.com',
  telefone: '(11) 99999-9999',
};

export const prontuariosMock = [
  {
    id: 1,
    data: '20/09/2026',
    status: 'Concluído',
    procedimento: 'Extração',
    dentista: 'Gustavo',
    descricao:
      'Extração do terceiro molar inferior direito após avaliação radiográfica.',
    documentoTitulo: 'Relatório da extração',
    denteTratado: '48',
    condicao:
      'Dente 48 parcialmente erupcionado com episódios recorrentes de inflamação.',
    planejamento: 'Extração de terceiro molar inferior direito.',
    realizado: [
      'Extração realizada após avaliação radiográfica.',
      'Orientações pós-operatórias fornecidas.',
    ],
    documentos: [
      {
        id: 101,
        titulo: 'Radiografia panorâmica',
        tipo: 'Imagem',
        data: '20/09/2026',
      },
      {
        id: 102,
        titulo: 'Receita pós-operatória',
        tipo: 'PDF',
        data: '20/09/2026',
      },
    ],
  },
  {
    id: 2,
    data: '12/08/2026',
    status: 'Concluído',
    procedimento: 'Restauração',
    dentista: 'Marina',
    descricao:
      'Restauração em resina composta no dente 26 devido a cárie oclusal.',
    documentoTitulo: 'Laudo da restauração',
    denteTratado: '26',
    condicao: 'Cárie oclusal moderada no dente 26.',
    planejamento: 'Remoção do tecido cariado e restauração em resina composta.',
    realizado: [
      'Remoção completa do tecido cariado.',
      'Restauração em resina composta finalizada.',
      'Ajuste de oclusão realizado.',
    ],
    documentos: [
      {
        id: 201,
        titulo: 'Registro fotográfico',
        tipo: 'Imagem',
        data: '12/08/2026',
      },
    ],
  },
  {
    id: 3,
    data: '28/07/2026',
    status: 'Em acompanhamento',
    procedimento: 'Tratamento de canal',
    dentista: 'Rafael',
    descricao:
      'Tratamento endodôntico do dente 36 em andamento, com sessão de limpeza e medicação.',
    documentoTitulo: 'Evolução do tratamento',
    denteTratado: '36',
    condicao: 'Pulpite irreversível no dente 36.',
    planejamento:
      'Concluir tratamento endodôntico e avaliar necessidade de coroa.',
    realizado: [
      'Abertura cameral e limpeza dos canais.',
      'Medicação intracanal aplicada.',
      'Retorno agendado para conclusão.',
    ],
    documentos: [
      {
        id: 301,
        titulo: 'Radiografia periapical',
        tipo: 'Imagem',
        data: '28/07/2026',
      },
      {
        id: 302,
        titulo: 'Prescrição de medicação',
        tipo: 'PDF',
        data: '28/07/2026',
      },
    ],
  },
  {
    id: 4,
    data: '05/06/2026',
    status: 'Concluído',
    procedimento: 'Limpeza e profilaxia',
    dentista: 'Camila',
    descricao:
      'Profilaxia completa, remoção de tártaro e orientações de higiene bucal.',
    documentoTitulo: 'Registro de profilaxia',
    denteTratado: null,
    condicao: 'Presença moderada de tártaro e placa bacteriana.',
    planejamento: 'Profilaxia e reforço das orientações de higiene bucal.',
    realizado: [
      'Remoção de tártaro supragengival.',
      'Profilaxia com jato de bicarbonato.',
      'Orientações sobre escovação e uso do fio dental.',
    ],
    documentos: [
      {
        id: 401,
        titulo: 'Orientações de higiene bucal',
        tipo: 'PDF',
        data: '05/06/2026',
      },
    ],
  },
];

export const prontuarioResponseMock = {
  paciente: pacienteMock,
  prontuarios: prontuariosMock,
};
