# ProjectSong API

**API para Streaming de Músicas**

## 📋 Visão Geral

ProjectSong API é um serviço backend completo para gerenciamento de músicas e usuários, com diferentes níveis de acesso e funcionalidades específicas para usuários comuns e administradores. O sistema implementa autenticação JWT, conexão com banco de dados PostgreSQL e utiliza Redis para gerenciamento de tokens.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web minimalista
- **TypeScript** - Superset JavaScript tipado
- **Sequelize** - ORM para PostgreSQL
- **JWT** - Autenticação baseada em tokens
- **Redis** - Armazenamento de cache e lista de tokens inválidos
- **bcrypt** - Criptografia de senhas

## 🏗️ Arquitetura do Projeto

```
src/
 ├── config/           # Configurações (banco de dados, Redis)
 ├── controllers/      # Controladores de rotas
 ├── interfaces/       # Interfaces TypeScript
 ├── middleware/       # Middlewares (autenticação, etc)
 ├── models/           # Modelos de dados
 ├── routes/           # Rotas da API
 ├── utils/            # Funções auxiliares
 └── server.ts         # Ponto de entrada da aplicação
```

## 🔌 Endpoints da API

### Autenticação e Perfil de Usuário

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/api/user/login` | Login de usuário | Não |
| POST | `/api/user/register` | Registro de novo usuário | Não |
| GET | `/api/profile` | Dados do perfil | Sim |
| PUT | `/api/edit/profile` | Atualizar perfil | Sim |
| DELETE | `/api/delete/profile` | Remover conta | Sim |

### Rotas de Música

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/musics` | Listar todas músicas | Sim |
| GET | `/api/music/search` | Buscar músicas por critérios | Sim |
| GET | `/api/music/data/:id` | Dados de música específica | Sim |

### Rotas de Administrador

#### Gerenciamento de Músicas

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/api/music/insert` | Adicionar nova música | Admin |
| PUT | `/api/music/edit/:id` | Editar música | Admin |
| DELETE | `/api/music/delete/:id` | Remover música | Admin |
| DELETE | `/api/music/delete/all` | Remover todas músicas | Admin |

#### Gerenciamento de Usuários

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/users` | Listar todos usuários | Admin |
| GET | `/api/user/name` | Buscar usuário por nome | Admin |
| GET | `/api/user/data/:id` | Dados de usuário específico | Admin |
| POST | `/api/user/create` | Criar novo usuário | Admin |
| PUT | `/api/user/edit/:id` | Editar usuário | Admin |
| DELETE | `/api/user/delete/:id` | Remover usuário | Admin |
| DELETE | `/api/user/delete/all` | Remover todos usuários | Admin |

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16+)
- PostgreSQL
- Redis

### Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/GabrielFinotti/ProjectSong-API.git
   cd ProjectSong-API
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   # Servidor
   PORT=3000
   
   # Banco de Dados
   DB_NAME=project_song
   DB_USER=postgres
   DB_PASSWORD=sua_senha
   DB_HOST=localhost
   DB_PORT=5432
   
   # Redis
   REDIS_URL=redis://localhost:6379
   
   # JWT
   SECRET_KEY=sua_chave_secreta
   ```

4. Execute em modo desenvolvimento:
   ```bash
   npm run dev
   ```

5. Para build de produção:
   ```bash
   npm run build
   npm start
   ```

## 🔐 Autenticação

- A API utiliza JWT (JSON Web Token) para autenticação
- Após o login, o token deve ser incluído no header das requisições:
  ```
  Authorization: Bearer <seu-token>
  ```
- Tokens invalidados (logout) são armazenados em uma blacklist no Redis

## 🧮 Modelos de Dados

### Usuário
- `username`: Nome de usuário (único)
- `email`: Email do usuário (único)
- `password`: Senha criptografada
- `imageUrl`: URL da imagem de perfil (opcional)
- `role`: Função do usuário ('user' ou 'admin')

### Música
- `title`: Título da música
- `songUrl`: URL do arquivo de áudio
- `duration`: Duração em segundos
- `imageUrl`: URL da capa (opcional)
- `artist`: Nome do artista (opcional)
- `genre`: Gênero musical (opcional)

## 👨‍💻 Desenvolvimento

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com recarga automática
- `npm run build`: Compila o código TypeScript para JavaScript
- `npm start`: Executa a versão compilada da aplicação

## 📜 Licença

ISC © Gabriel Henrique Finotti

---

# ProjectSong API (English Version)

**Music Streaming API**

## 📋 Overview

ProjectSong API is a complete backend service for music and user management, with different access levels and specific functionalities for regular users and administrators. The system implements JWT authentication, PostgreSQL database connection, and uses Redis for token management.

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express** - Minimalist web framework
- **TypeScript** - Typed JavaScript superset
- **Sequelize** - ORM for PostgreSQL
- **JWT** - Token-based authentication
- **Redis** - Cache storage and invalidated token list
- **bcrypt** - Password encryption

## 🏗️ Project Architecture

```
src/
 ├── config/           # Configurations (database, Redis)
 ├── controllers/      # Route controllers
 ├── interfaces/       # TypeScript interfaces
 ├── middleware/       # Middlewares (authentication, etc)
 ├── models/           # Data models
 ├── routes/           # API routes
 ├── utils/            # Helper functions
 └── server.ts         # Application entry point
```

## 🔌 API Endpoints

### Authentication and User Profile

| Method | Route | Description | Authentication |
|--------|-------|-------------|---------------|
| POST | `/api/user/login` | User login | No |
| POST | `/api/user/register` | Register new user | No |
| GET | `/api/profile` | Profile data | Yes |
| PUT | `/api/edit/profile` | Update profile | Yes |
| DELETE | `/api/delete/profile` | Remove account | Yes |

### Music Routes

| Method | Route | Description | Authentication |
|--------|-------|-------------|---------------|
| GET | `/api/musics` | List all songs | Yes |
| GET | `/api/music/search` | Search songs by criteria | Yes |
| GET | `/api/music/data/:id` | Specific song data | Yes |

### Admin Routes

#### Music Management

| Method | Route | Description | Authentication |
|--------|-------|-------------|---------------|
| POST | `/api/music/insert` | Add new song | Admin |
| PUT | `/api/music/edit/:id` | Edit song | Admin |
| DELETE | `/api/music/delete/:id` | Remove song | Admin |
| DELETE | `/api/music/delete/all` | Remove all songs | Admin |

#### User Management

| Method | Route | Description | Authentication |
|--------|-------|-------------|---------------|
| GET | `/api/users` | List all users | Admin |
| GET | `/api/user/name` | Search user by name | Admin |
| GET | `/api/user/data/:id` | Specific user data | Admin |
| POST | `/api/user/create` | Create new user | Admin |
| PUT | `/api/user/edit/:id` | Edit user | Admin |
| DELETE | `/api/user/delete/:id` | Remove user | Admin |
| DELETE | `/api/user/delete/all` | Remove all users | Admin |

## 🚀 How to Run

### Prerequisites

- Node.js (version 16+)
- PostgreSQL
- Redis

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/GabrielFinotti/ProjectSong-API.git
   cd ProjectSong-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env` file:
   ```
   # Server
   PORT=3000
   
   # Database
   DB_NAME=project_song
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   
   # Redis
   REDIS_URL=redis://localhost:6379
   
   # JWT
   SECRET_KEY=your_secret_key
   ```

4. Run in development mode:
   ```bash
   npm run dev
   ```

5. For production build:
   ```bash
   npm run build
   npm start
   ```

## 🔐 Authentication

- The API uses JWT (JSON Web Token) for authentication
- After login, the token must be included in request headers:
  ```
  Authorization: Bearer <your-token>
  ```
- Invalidated tokens (logout) are stored in a Redis blacklist

## 🧮 Data Models

### User
- `username`: Username (unique)
- `email`: User email (unique)
- `password`: Encrypted password
- `imageUrl`: Profile image URL (optional)
- `role`: User role ('user' or 'admin')

### Music
- `title`: Song title
- `songUrl`: Audio file URL
- `duration`: Duration in seconds
- `imageUrl`: Cover image URL (optional)
- `artist`: Artist name (optional)
- `genre`: Music genre (optional)

## 👨‍💻 Development

### Available Scripts

- `npm run dev`: Starts the server in development mode with auto-reload
- `npm run build`: Compiles TypeScript code to JavaScript
- `npm start`: Runs the compiled application

## 📜 License

ISC © Gabriel Henrique Finotti