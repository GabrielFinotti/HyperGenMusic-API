# ProjectSong-API

**API para Streaming de Músicas**

## Introdução
Esta API permite o gerenciamento de usuários e músicas, oferecendo endpoints para autenticação, registro, atualização de perfil e gerenciamento de dados de músicas.

## Tecnologias Utilizadas
- Node.js
- Express
- TypeScript
- Sequelize (PostgreSQL)
- JWT para autenticação

## Endpoints

### Usuários
- POST `/api/user/login`: Autentica o usuário e gera token JWT.
- POST `/api/user/register`: Registra um novo usuário.
- GET `/api/profile`: Recupera dados do perfil do usuário autenticado.
- PUT `/api/edit/profile`: Atualiza os dados do perfil do usuário autenticado.
- DELETE `/api/delete/profile`: Remove o perfil do usuário autenticado.

### Admin & Músicas
- Endpoints para inserção, edição e exclusão de músicas e usuários fornecidos nas rotas `/api` (adminRoutes e musicRoutes).

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente no arquivo .env (informações de banco de dados, chave secreta, etc.).
3. Inicie a aplicação em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Banco de Dados
A API utiliza PostgreSQL com Sequelize como ORM para gerenciar a conexão e sincronização dos modelos.

## Observações
- Use o token JWT para acessar os endpoints protegidos.
- As validações de dados são aplicadas tanto para usuários quanto para músicas.

## English Version

# ProjectSong-API

**Music Streaming API**

## Introduction
This API allows managing users and songs, offering endpoints for authentication, registration, profile update, and song data management.

## Technologies Used
- Node.js
- Express
- TypeScript
- Sequelize (PostgreSQL)
- JWT for authentication

## Endpoints

### Users
- POST `/api/user/login`: Authenticates the user and generates a JWT token.
- POST `/api/user/register`: Registers a new user.
- GET `/api/profile`: Retrieves profile data of the authenticated user.
- PUT `/api/edit/profile`: Updates the profile data of the authenticated user.
- DELETE `/api/delete/profile`: Removes the authenticated user's profile.

### Admin & Songs
- Endpoints for inserting, editing, and deleting songs and users provided in the routes `/api` (adminRoutes and musicRoutes).

## How to Run

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in the .env file (database information, secret key, etc.).
3. Start the application in development mode:
   ```bash
   npm run dev
   ```

## Database
The API uses PostgreSQL with Sequelize as an ORM to manage the connection and model synchronization.

## Notes
- Use the JWT token to access protected endpoints.
- Data validations are applied for both users and songs.