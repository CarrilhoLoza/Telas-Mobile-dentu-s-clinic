# Dentus Clinic — App Cliente (React Native + Expo)

Aplicativo mobile da área do cliente da clínica, gerado a partir da seção **Cliente** do projeto Figma **Ampliação dentus Clinic**.

## Telas implementadas

- Login
- Consultas
- Prontuários
- Perfil
- Redefinir senha

## Arquitetura MVVM

```text
src/
├── features/
│   └── cliente/
│       ├── models/       # Entidades e conversão de dados da API
│       ├── services/     # Chamadas HTTP e definição dos endpoints
│       ├── viewmodels/   # Estado, regras de apresentação e ações
│       └── views/        # Telas React Native
├── navigation/           # Navegação por tabs e stack
├── services/             # Cliente HTTP central (Axios)
└── theme/                # Cores do design
```

- **View:** apenas interface e interação do usuário.
- **ViewModel:** controla estado, validação e ações.
- **Model:** representa os dados.
- **Service:** realiza chamadas à API.

## Como rodar

```bash
npm install
npx expo start -c
```

Para abrir no emulador Android:

```bash
npx expo start --android
```

## Configuração da API

Edite `src/services/api.js`:

```js
const BASE_URL = 'http://10.0.2.2:3000/api';
```

- Emulador Android: `http://10.0.2.2:3000/api`
- Dispositivo físico: `http://SEU_IP_LOCAL:3000/api`
- Produção: `https://api.dentusclinic.com/api`

## Endpoints esperados

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Realiza login e retorna token JWT e dados do paciente |
| `POST` | `/api/auth/logout` | Encerra a sessão |
| `POST` | `/api/auth/recuperar-senha` | Envia instruções de recuperação de senha |

### Consultas

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/consultas/cliente` | Lista consultas do cliente autenticado |
| `POST` | `/api/consultas/:id/confirmar` | Confirma uma consulta |
| `POST` | `/api/consultas/:id/recusar` | Recusa uma consulta |

### Prontuário

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/prontuarios/cliente` | Retorna paciente e histórico de atendimentos |

### Perfil

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/clientes/perfil` | Retorna dados do perfil |
| `PUT` | `/api/clientes/perfil` | Atualiza nome, e-mail e telefone |
| `POST` | `/api/clientes/perfil/redefinir-senha` | Redefine a senha do cliente |

## Observações

- O token JWT é adicionado automaticamente pelo interceptor do Axios.
- Se a API retornar `401`, o token local é removido.
- Os dados exibidos nas telas devem vir da API; os textos do Figma servem como exemplo visual.
