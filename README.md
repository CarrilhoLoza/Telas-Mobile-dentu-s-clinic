# Dentus Clinic — App Cliente (React Native + Expo)

Aplicativo mobile da área do cliente da clínica, gerado a partir da seção **Cliente** do projeto Figma **Ampliação dentus Clinic**.

Expo SDK 51 · React Native 0.74

## Telas implementadas

- Login
- Primeiro acesso (criação da senha)
- Consultas
- Prontuários
- Prontuários Expandido
- Perfil
- Redefinir senha

Todas as telas consomem a API real.

## Arquitetura MVVM

```text
src/
├── components/           # Componentes reutilizáveis
├── config/               # lê o .env e expõe a configuração
├── features/
│   └── cliente/
│       ├── models/       # Entidades e conversão de dados da API
│       ├── services/     # Chamadas HTTP e definição dos endpoints
│       ├── viewmodels/   # Estado, regras de apresentação e ações
│       └── views/        # Telas React Native
├── navigation/           # Navegação por tabs e stack
├── services/             # Cliente HTTP central (Axios) e sessão
└── theme/                # Cores do design
```

- **View:** apenas interface e interação do usuário.
- **ViewModel:** controla estado, validação e ações.
- **Model:** representa os dados.
- **Service:** realiza chamadas à API.

## ⚠️ O Expo Go não serve mais

Este app **não roda no Expo Go**. Ele usa bibliotecas nativas que o Expo Go não embute:

- `expo-notifications` — notificações push pelo Firebase
- `expo-secure-store` — guarda a sessão do "manter conectado"

No caso das notificações isso é definitivo, não é uma limitação temporária: o Firebase entrega a mensagem para um aplicativo específico, identificado pelo `google-services.json`. O Expo Go é o aplicativo da Expo, então o token gerado por ele pertence a outro projeto e o envio é recusado com `SenderIdMismatch`.

**Para testar notificações é obrigatório usar o build de desenvolvimento.**

## Como rodar

### Pré-requisitos

| O quê | Observação |
|---|---|
| Node e npm | — |
| Android Studio | com o SDK do Android instalado |
| **JDK 17** | o Gradle 8.8 não funciona com Java 23 ou mais novo |
| Celular Android | com depuração USB ativada |

O `google-services.json` já está no repositório, na raiz e em `android/app/`. Não precisa baixar nada do Firebase.

Se o Java da sua máquina for mais novo que o 17, instale o 17 e aponte para ele antes de compilar:

```powershell
winget install EclipseAdoptium.Temurin.17.JDK
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
```

Confira o nome exato da pasta do JDK em `C:\Program Files\Eclipse Adoptium`.

### Primeira vez: gerar o build

Com o celular conectado por USB:

```bash
npm install
cp .env.example .env    # e ajuste o endereço da API
npx expo run:android
```

A primeira compilação demora bastante. No fim, o app é instalado no celular.

No celular, além da **depuração USB**, pode ser preciso ativar **"Instalar via USB"** nas opções do desenvolvedor — sem isso a instalação é recusada com `INSTALL_FAILED_USER_RESTRICTED`.

### Dia a dia

São **dois terminais**: um para o backend e outro para o aplicativo.

**1. Suba o backend**, na pasta `api` do projeto da API:

```bash
dotnet run --urls http://0.0.0.0:5081
```

O `--urls http://0.0.0.0:5081` não é opcional. Por padrão a API escuta só em `localhost`, e `localhost` no celular é o próprio celular — o aplicativo nunca chega no seu computador. O sintoma é a tela abrir normalmente e tudo que depende de dado falhar com "Não foi possível conectar ao servidor".

**2. Suba o aplicativo.** Com o app já instalado, o cabo não é mais necessário; basta o celular estar no mesmo Wi-Fi do computador:

```bash
npx expo start --dev-client
```

Abra o **Dentus Clinic** no celular (não o Expo Go). Mudanças em JavaScript recarregam sozinhas.

**Só é preciso recompilar** (`npx expo run:android`) quando mudar algo nativo: instalar biblioteca com código nativo, alterar o `app.json` ou os arquivos de `android/`.

### Se o celular não conectar no Metro

Confira o endereço que o terminal mostra. Se aparecer `127.0.0.1`, o celular não tem como chegar nele — force o IP da sua máquina:

```powershell
$env:REACT_NATIVE_PACKAGER_HOSTNAME = "192.168.0.101"
npx expo start --dev-client
```

Com cabo, dá para dispensar a rede por completo:

```bash
adb reverse tcp:8081 tcp:8081
```

## Configuração da API

A configuração fica no `.env`, que **não é versionado** — cada máquina tem o seu, porque o endereço depende do IP da rede local. Copie o modelo e ajuste:

```bash
cp .env.example .env
```

```ini
EXPO_PUBLIC_API_BASE_URL=http://192.168.0.101:5081/api
EXPO_PUBLIC_USE_MOCK=false
```

| Cenário | Endereço |
|---|---|
| Celular físico | `http://IP_DA_SUA_MAQUINA:5081/api` |
| Emulador Android | `http://10.0.2.2:5081/api` |

Dois detalhes do Expo: o prefixo `EXPO_PUBLIC_` é obrigatório, senão a variável não chega no aplicativo; e os valores são injetados na hora de empacotar, então **ao mudar o `.env` reinicie o Metro limpando o cache**:

```bash
npx expo start --dev-client -c
```

Sem a variável definida o app não sobe, e o erro diz exatamente o que fazer — é melhor que cair num endereço padrão errado e virar um "não foi possível conectar ao servidor" sem explicação.

Lembrando que o backend precisa subir com `--urls http://0.0.0.0:5081`, como explicado na seção anterior.

O `EXPO_PUBLIC_USE_MOCK` liga dados falsos na tela de consultas, útil para demonstrar o app sem a API no ar.

## Notificações

O fluxo completo:

1. O paciente faz login no app, que pede permissão de notificação, obtém o token do Firebase e o registra em `POST /api/paciente-app/dispositivos`.
2. A recepção agenda uma consulta.
3. O backend avisa o paciente 24h antes, e reenvia de hora em hora enquanto ele não responder.
4. O paciente confirma ou recusa pelo app.

Para testar sem esperar: agende uma consulta com horário **entre 1 e 24 horas a partir de agora**. A notificação sai no momento do agendamento. Feche o app antes, senão o Android não mostra a faixa na tela.

A mesma consulta não é notificada duas vezes dentro de uma hora, e consulta já confirmada ou recusada sai da fila de avisos — por isso, nos testes, o caminho mais simples é sempre criar uma consulta nova.

## Endpoints usados

Todos sob `/api`, com o token JWT no cabeçalho `Authorization`.

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/auth/login` | Login; retorna token, perfil e `primeiroAcesso` |
| `POST` | `/paciente-app/alterar-senha-inicial` | Define a senha no primeiro acesso |

Não existe logout no servidor: o token é sem estado e expira sozinho.

### Consultas

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/paciente-app/consultas-futuras` | Próximas consultas |
| `GET` | `/paciente-app/historico` | Consultas anteriores |
| `POST` | `/paciente-app/consultas/:id/confirmar` | Confirma presença |
| `POST` | `/paciente-app/consultas/:id/recusar` | Recusa; a consulta é cancelada |

### Prontuário

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/paciente-app/tratamentos` | Planos de tratamento do paciente |

### Perfil

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/paciente-app/perfil` | Dados do paciente |
| `PUT` | `/paciente-app/perfil` | Atualiza nome, e-mail e telefone |
| `POST` | `/paciente-app/alterar-senha` | Troca a senha conferindo a atual |

### Dispositivos

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/paciente-app/dispositivos` | Registra o token de notificação do aparelho |

## Observações

- O token JWT é adicionado automaticamente pelo interceptor do Axios.
- Se a API retornar `401`, o token local é removido.
- A API responde num envelope `{ sucesso, mensagem, dados }`; use o helper `conteudo()` de `src/services/api.js` em vez de ler `response.data` direto.
- Enquanto o paciente não trocar a senha temporária, a API recusa todos os endpoints do app, menos o de troca de senha.
- O e-mail é a credencial de acesso: alterá-lo no perfil muda o e-mail usado para entrar.
