# Análise de Requisitos — Dentus'Clinic

## 1. Visão geral

O **Dentus'Clinic** é um sistema de gestão para clínica odontológica, composto por:

- **Sistema Web:** utilizado por administrador, recepcionistas e dentistas.
- **Aplicativo Mobile:** utilizado pelos pacientes para consultar agendamentos, confirmar ou recusar presença e visualizar o histórico.
- **Back-end:** responsável pela autenticação, autorização, persistência de dados, validação das regras de negócio, sincronização entre plataformas e envio de notificações push.

O sistema tem como objetivo apoiar o cadastro de pacientes e profissionais, o gerenciamento da agenda odontológica, o registro de atendimentos, a manutenção do prontuário e a comunicação com os pacientes.

## 2. Atores e permissões

| Ator | Plataforma | Responsabilidades principais |
|---|---|---|
| Administrador | Web | Gerenciar usuários internos, perfis de acesso, especialidades, serviços e dados sensíveis |
| Recepcionista | Web | Cadastrar pacientes, criar acesso mobile, agendar, alterar e cancelar consultas, registrar chegada |
| Dentista | Web | Visualizar agenda, atender pacientes, registrar atendimentos, prontuário e plano de tratamento |
| Paciente | Mobile | Autenticar-se, visualizar consultas e histórico, confirmar/recusar presença e receber notificações |
| Sistema | Back-end | Validar regras, controlar acesso, sincronizar dados, registrar dispositivos e disparar notificações |

## 3. Regras de negócio

### 3.1 Cadastro e acesso

- **RN01** — Um paciente deve estar previamente cadastrado no sistema para que seja possível realizar o agendamento de uma consulta.
- **RN02** — Cada consulta deve estar associada a um único dentista responsável pelo atendimento.
- **RN03** — Um dentista não pode possuir duas consultas ativas no mesmo horário; o sistema deve validar conflitos de agenda antes de confirmar o agendamento.
- **RN04** — Apenas usuários autenticados e autorizados podem acessar o sistema, conforme seu perfil: administrador, recepcionista, dentista ou paciente.
- **RN05** — A recepcionista é responsável pelo cadastro de pacientes, criação do acesso mobile do paciente e gerenciamento dos agendamentos de consultas.
- **RN11** — Apenas o administrador pode cadastrar, editar, desativar ou remover usuários internos, incluindo dentistas e recepcionistas.
- **RN12** — O acesso do paciente ao aplicativo mobile deve ser criado pela recepcionista no momento do cadastro, com login e senha temporária. No primeiro acesso, o paciente deve definir uma nova senha antes de utilizar as demais funcionalidades.
- **RN25** — Toda conta de usuário deve estar vinculada a um perfil de acesso, que define as funcionalidades e os dados que podem ser visualizados ou manipulados.
- **RN26** — A exclusão de um paciente deve ser uma ação restrita ao administrador e deve considerar o histórico clínico existente; recomenda-se exclusão lógica para preservar rastreabilidade e integridade dos dados.
- **RN27** — O sistema deve permitir o cadastro e a manutenção de especialidades odontológicas e serviços oferecidos pela clínica, vinculando-os a dentistas e consultas quando aplicável.

### 3.2 Consultas e agenda

- **RN06** — Cada atendimento realizado deve estar vinculado a uma consulta previamente registrada no sistema.
- **RN07** — O sistema deve manter o histórico de atendimentos de cada paciente cadastrado.
- **RN08** — As informações dos pacientes devem ser armazenadas de forma organizada, íntegra e consultável para atendimentos futuros.
- **RN09** — O cancelamento ou alteração de consultas deve ser realizado apenas por funcionários autorizados, exceto pelo cancelamento automático decorrente da recusa de presença do paciente no aplicativo mobile, conforme RN18.
- **RN10** — O sistema deve registrar as informações necessárias para identificar o paciente, o dentista, a especialidade/serviço, a data, o horário e o status da consulta.
- **RN14** — A confirmação ou recusa de presença pelo paciente deve estar disponível somente até o horário agendado da consulta.
- **RN15** — Caso o paciente não responda à solicitação de confirmação, a consulta deve permanecer com status **Pendente** até o horário agendado.
- **RN16** — Uma consulta com status **Pendente** permanece válida até ser cancelada manualmente por um funcionário autorizado ou automaticamente pela recusa de presença do paciente.
- **RN17** — A confirmação ou recusa de presença pode ser registrada por um funcionário da clínica ou pelo próprio paciente por meio do aplicativo mobile.
- **RN18** — Caso o paciente recuse a presença pelo aplicativo, o sistema deve cancelar automaticamente a consulta correspondente e registrar o motivo/status como recusa do paciente.
- **RN19** — Consultas já realizadas, exibidas no histórico do paciente, não devem permitir alteração, confirmação ou cancelamento.
- **RN28** — O sistema deve controlar o status da consulta ao longo do fluxo: **Agendada/Pendente**, **Confirmada**, **Recusada**, **Cancelada**, **Aguardando atendimento**, **Em atendimento** e **Realizada**.
- **RN29** — O sistema deve impedir o agendamento de consultas em datas ou horários inválidos, como horários fora do funcionamento da clínica ou datas anteriores à data atual.
- **RN30** — Ao registrar a chegada do paciente, o sistema deve atualizar o status da consulta e notificar o dentista responsável de que o paciente está aguardando atendimento.
- **RN31** — Uma consulta somente pode ser marcada como **Realizada** após o registro do atendimento correspondente pelo dentista responsável.

### 3.3 Prontuário e histórico

- **RN13** — O paciente deve ter acesso apenas às suas próprias informações e histórico de consultas, não podendo visualizar dados de outros pacientes.
- **RN20** — Os registros do prontuário não podem ser alterados ou removidos após gravados; é permitida apenas a inclusão de novos registros complementares.
- **RN32** — O dentista só pode registrar atendimentos, prontuários e planos de tratamento para consultas às quais está vinculado como profissional responsável.
- **RN33** — Cada atendimento deve registrar, no mínimo, data, dentista responsável, paciente, procedimento/serviço realizado, observações clínicas e vínculo com a consulta.
- **RN34** — O plano de tratamento deve permanecer vinculado ao paciente e ao prontuário, permitindo acompanhar tratamentos ativos, em andamento, concluídos ou cancelados.
- **RN35** — O histórico de consultas do paciente deve exibir apenas consultas com status **Realizada**, preservando os dados do atendimento registrado.

### 3.4 Notificações e dispositivos

- **RN21** — O sistema deve enviar ao paciente uma notificação push um dia antes da consulta, solicitando confirmação de presença.
- **RN22** — Enquanto o paciente não confirmar nem recusar a presença, o sistema deve reenviar a notificação a cada 1 hora, até o horário agendado da consulta.
- **RN23** — O dispositivo do paciente deve ser registrado no sistema por meio do token de notificação a cada acesso ao aplicativo. Um paciente pode possuir mais de um dispositivo ativo, mas um mesmo token não pode estar ativo para pacientes diferentes.
- **RN24** — As notificações devem ser enviadas apenas a dispositivos ativos e somente para consultas pendentes de confirmação; não devem ser enviadas para consultas canceladas ou já realizadas.
- **RN36** — Quando o paciente confirmar ou recusar a presença, o sistema deve interromper o envio das notificações relacionadas àquela consulta.
- **RN37** — O sistema deve tratar tokens inválidos, expirados ou substituídos, removendo-os ou atualizando-os para evitar tentativas de envio a dispositivos indisponíveis.
- **RN38** — As notificações devem conter informações mínimas necessárias, como nome da clínica, data, horário e identificação da consulta, sem expor dados clínicos sensíveis.

## 4. Requisitos funcionais

### 4.1 Administração e usuários

| Código | Requisito | Ator principal |
|---|---|---|
| RF01 | O sistema deve permitir o cadastro de pacientes. | Recepcionista |
| RF02 | O sistema deve permitir a edição das informações dos pacientes cadastrados. | Recepcionista |
| RF03 | O sistema deve permitir a exclusão de pacientes cadastrados. | Administrador |
| RF04 | O sistema deve permitir o cadastro de dentistas e recepcionistas. | Administrador |
| RF05 | O sistema deve permitir a edição das informações dos funcionários cadastrados. | Administrador |
| RF06 | O sistema deve permitir a exclusão ou desativação de funcionários cadastrados. | Administrador |
| RF07 | O sistema deve permitir definir perfis de acesso por tipo de usuário: administrador, dentista e recepcionista. | Administrador |
| RF18 | O sistema deve permitir a visualização da lista de funcionários cadastrados. | Administrador, Recepcionista |
| RF39 | O sistema deve permitir o cadastro, edição e visualização de especialidades odontológicas. | Administrador |
| RF40 | O sistema deve permitir o cadastro, edição e visualização dos serviços oferecidos pela clínica. | Administrador |
| RF41 | O sistema deve permitir vincular dentistas a especialidades e serviços. | Administrador |

### 4.2 Autenticação

| Código | Requisito | Ator principal |
|---|---|---|
| RF19 | O sistema deve permitir acesso ao sistema web mediante autenticação por login e senha. | Administrador, Recepcionista, Dentista |
| RF20 | O sistema deve permitir que o paciente realize login no aplicativo mobile mediante autenticação por login e senha. | Paciente |
| RF42 | O sistema deve exigir que o paciente altere a senha temporária no primeiro acesso ao aplicativo mobile. | Paciente |
| RF43 | O sistema deve permitir logout e encerramento seguro da sessão do usuário. | Todos os usuários |
| RF44 | O sistema deve registrar o token de notificação do dispositivo do paciente a cada acesso ao aplicativo mobile. | Paciente |
| RF45 | O sistema deve permitir a recuperação ou redefinição de senha pelo administrador/recepcionista, conforme o tipo de usuário. | Administrador, Recepcionista |

### 4.3 Agenda e consultas

| Código | Requisito | Ator principal |
|---|---|---|
| RF08 | O sistema deve permitir o agendamento de consultas, selecionando paciente, dentista, especialidade/serviço, data e horário. | Recepcionista |
| RF09 | O sistema deve permitir a visualização da agenda de consultas, com filtros por data, dentista, paciente e status. | Recepcionista, Dentista |
| RF10 | O sistema deve permitir a alteração de consultas agendadas, validando disponibilidade do dentista. | Recepcionista |
| RF11 | O sistema deve permitir o cancelamento de consultas, registrando o responsável pelo cancelamento. | Recepcionista |
| RF12 | O sistema deve permitir registrar a chegada do paciente na clínica e atualizar seu status na agenda. | Recepcionista |
| RF13 | O sistema deve notificar o dentista quando um paciente estiver aguardando atendimento. | Dentista |
| RF22 | O sistema deve permitir que o paciente confirme ou recuse sua presença na consulta diretamente pelo aplicativo mobile. | Paciente |
| RF23 | O sistema deve exibir na agenda o status de confirmação da consulta: pendente, confirmada ou recusada. | Recepcionista |
| RF46 | O sistema deve permitir que o paciente visualize a lista de suas consultas futuras agendadas. | Paciente |
| RF47 | O sistema deve permitir que o paciente visualize os detalhes da consulta, como data, horário, dentista e especialidade/serviço. | Paciente |
| RF48 | O sistema deve atualizar automaticamente o status da consulta no sistema web após confirmação ou recusa pelo paciente no aplicativo mobile. | Sistema |

### 4.4 Atendimento e prontuário

| Código | Requisito | Ator principal |
|---|---|---|
| RF14 | O sistema deve permitir que o dentista registre o planejamento de tratamento do paciente após a consulta. | Dentista |
| RF15 | O sistema deve permitir que o dentista registre o atendimento realizado, vinculado à consulta correspondente. | Dentista |
| RF16 | O sistema deve permitir a visualização do histórico de atendimentos de cada paciente. | Dentista |
| RF17 | O sistema deve permitir a consulta das informações dos pacientes cadastrados. | Recepcionista, Dentista |
| RF24 | O sistema deve permitir que o paciente visualize seu histórico de consultas já realizadas. | Paciente |
| RF49 | O sistema deve permitir o registro do prontuário do paciente, incluindo observações clínicas e procedimentos realizados. | Dentista |
| RF50 | O sistema deve permitir a consulta do prontuário e dos planos de tratamento do paciente. | Dentista |
| RF51 | O sistema deve permitir o acompanhamento do status do plano de tratamento: ativo, em andamento, concluído ou cancelado. | Dentista |
| RF52 | O sistema deve impedir a edição ou exclusão de registros de prontuário já gravados. | Sistema |

## 5. Requisitos não funcionais

### 5.1 Usabilidade e compatibilidade

- **RNF01** — O sistema deve possuir interface intuitiva, consistente e de fácil utilização para os diferentes perfis de usuário.
- **RNF05** — O sistema web deve ser compatível com navegadores modernos, incluindo Chrome, Edge, Firefox e Safari em versões recentes.
- **RNF10** — O aplicativo mobile deve ser compatível com versões recentes do Android e deve ser responsivo aos principais tamanhos de tela.
- **RNF53** — As telas devem oferecer feedback claro para ações do usuário, como sucesso, erro, carregamento e campos obrigatórios.
- **RNF54** — O aplicativo mobile deve permitir o uso das funcionalidades essenciais mesmo em conexão instável, exibindo mensagens apropriadas quando não for possível sincronizar.

### 5.2 Segurança e privacidade

- **RNF02** — O sistema deve garantir a segurança e a confidencialidade das informações dos pacientes.
- **RNF03** — O sistema deve permitir acesso apenas a usuários autenticados e autorizados conforme seu perfil.
- **RNF55** — As senhas devem ser armazenadas por meio de hash seguro, como BCrypt, e nunca em texto puro.
- **RNF56** — As comunicações entre aplicativo mobile, sistema web e back-end devem ocorrer por HTTPS.
- **RNF57** — O sistema deve aplicar controle de acesso baseado em perfil, impedindo que um usuário acesse recursos de outro perfil.
- **RNF58** — O paciente deve acessar exclusivamente seus próprios dados, consultas, histórico e prontuário.
- **RNF59** — O sistema deve registrar eventos relevantes de segurança e auditoria, como login, alteração de consulta, cancelamento e criação de usuários.

### 5.3 Dados, desempenho e manutenção

- **RNF04** — O sistema deve apresentar tempo de resposta adequado durante a navegação e nas operações principais.
- **RNF06** — O sistema deve manter a integridade, consistência e rastreabilidade dos dados armazenados.
- **RNF07** — O sistema deve permitir fácil manutenção e atualização do código, com separação clara entre front-end, mobile e back-end.
- **RNF08** — O sistema deve possuir arquitetura modular que facilite a escalabilidade futura.
- **RNF09** — O sistema deve garantir sincronização consistente dos dados entre o aplicativo mobile e o sistema web.
- **RNF60** — O banco de dados deve utilizar chaves estrangeiras e validações para preservar relacionamentos entre pacientes, dentistas, consultas, atendimentos, prontuários e planos.
- **RNF61** — O sistema deve realizar backup periódico dos dados da clínica.
- **RNF62** — O código deve utilizar controle de versão, padrões de nomenclatura e organização por camadas ou módulos.

### 5.4 Notificações

- **RNF11** — O sistema deve garantir a entrega confiável das notificações push relacionadas à confirmação de presença nas consultas.
- **RNF63** — O serviço de notificações deve registrar tentativas de envio, falhas e status de entrega para permitir diagnóstico.
- **RNF64** — O envio de notificações deve ser processado de forma assíncrona, sem bloquear as operações principais do sistema.
- **RNF65** — O sistema deve evitar envios duplicados para a mesma consulta e o mesmo dispositivo.

## 6. Módulos sugeridos para o back-end

- Autenticação e autorização
- Usuários e perfis de acesso
- Pacientes
- Dentistas e funcionários
- Especialidades e serviços
- Agenda e consultas
- Atendimentos
- Prontuário e planos de tratamento
- Dispositivos e tokens de notificação
- Notificações push

## 7. Decisões e pontos a definir

- Recomenda-se utilizar **desativação lógica** em vez de exclusão física para pacientes, dentistas e funcionários que possuam histórico no sistema.
- Definir se **“Agendada”** e **“Pendente”** representam o mesmo status inicial. Sugestão: **Agendada** é a consulta criada; **Pendente** é o status de confirmação do paciente.
- Definir o prazo máximo para o paciente recusar uma consulta. Sugestão: até o horário agendado ou até 1 hora antes da consulta.
- Definir se o dentista poderá visualizar apenas a própria agenda ou também a agenda geral da clínica.
- Definir se o administrador poderá visualizar relatórios gerenciais, como consultas realizadas, cancelamentos e taxa de confirmação.
