# CVPilot AI

Aplicacao full stack para geracao de conteudo profissional com IA, com frontend React/Vite e backend Node.js/Express/Prisma.

## Requisitos locais

- Node.js 20 LTS
- PostgreSQL 14+
- npm 10+

Observacao para Windows:

- Se voce estiver usando Node 24, `bcrypt` pode exigir Python e toolchain nativa.
- Para desenvolvimento local deste projeto, use Node 20 LTS.
- Se o Prisma falhar ao baixar binarios por certificado local, use o comando PowerShell documentado abaixo.

## Estrutura

```text
CVPilot-AI/
  client/
  server/
```

## Arquivos de ambiente

### Server

Arquivo: [server/.env.example](/C:/Users/6168736/CVPilot-AI/server/.env.example)

```env
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cvpilot_ai?schema=public
JWT_SECRET=change_this_to_a_long_random_secret
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
AI_PROVIDER=mock
```

### Client

Arquivo: [client/.env.example](/C:/Users/6168736/CVPilot-AI/client/.env.example)

```env
VITE_API_URL=http://localhost:4000/api
```

## Configuracao do PostgreSQL local

1. Inicie o PostgreSQL local.
2. Crie o banco:

```sql
CREATE DATABASE cvpilot_ai;
```

3. Opcionalmente, confirme o usuario e senha locais. O exemplo assume:

- usuario: `postgres`
- senha: `postgres`
- host: `localhost`
- porta: `5432`

Se seu usuario ou senha forem diferentes, ajuste `DATABASE_URL` em `server/.env`.

Exemplo final:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cvpilot_ai?schema=public
```

## Setup local exato

### 1. Backend

```powershell
cd C:\Users\6168736\CVPilot-AI\server
Copy-Item .env.example .env
npm install
```

Se o Prisma falhar ao gerar client por certificado no Windows PowerShell:

```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED='0'
npm run prisma:generate
```

Se nao houver esse erro:

```powershell
npm run prisma:generate
```

Rode migracao e seed:

```powershell
npm run prisma:migrate
npm run prisma:seed
```

Suba o backend:

```powershell
npm run dev
```

O backend ficara em:

```text
http://localhost:4000
http://localhost:4000/api
```

### 2. Frontend

```powershell
cd C:\Users\6168736\CVPilot-AI\client
Copy-Item .env.example .env
npm install
npm run dev
```

O frontend ficara em:

```text
http://localhost:5173
```

## Comandos exatos pedidos

### Prisma migrate dev

```powershell
cd C:\Users\6168736\CVPilot-AI\server
npm run prisma:migrate
```

### Prisma db seed

```powershell
cd C:\Users\6168736\CVPilot-AI\server
npm run prisma:seed
```

### Backend dev

```powershell
cd C:\Users\6168736\CVPilot-AI\server
npm run dev
```

### Frontend dev

```powershell
cd C:\Users\6168736\CVPilot-AI\client
npm run dev
```

## Seeds incluidos

- Plano `Free`
- Plano `Premium`
- Usuario admin inicial

Credenciais do admin:

- email: `admin@cvpilot.ai`
- senha: `Admin@123`
