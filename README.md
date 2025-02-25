# ProjectSong-API

**API para Streaming de Músicas**

## Introdução
Esta API fornece um sistema completo de gerenciamento de músicas e usuários, com diferentes níveis de acesso e funcionalidades específicas para usuários comuns e administradores.

## Tecnologias Utilizadas
- Node.js
- Express
- TypeScript
- Sequelize (PostgreSQL)
- JWT para autenticação

## Endpoints

### Rotas de Usuário
- POST `/api/user/login` - Login do usuário
- POST `/api/user/register` - Registro de novo usuário
- GET `/api/profile` - Dados do perfil (requer autenticação)
- PUT `/api/edit/profile` - Atualização do perfil (requer autenticação)
- DELETE `/api/delete/profile` - Remoção da conta (requer autenticação)

### Rotas de Música
- GET `/api/musics` - Lista todas as músicas disponíveis
- GET `/api/music/search` - Busca músicas por critérios específicos
- GET `/api/music/data/:id` - Obtém dados detalhados de uma música específica

### Rotas de Administrador
Gerenciamento de Músicas:
- POST `/api/music/insert` - Adiciona nova música
- PUT `/api/music/edit/:id` - Edita música existente
- DELETE `/api/music/delete/:id` - Remove música específica
- DELETE `/api/music/delete/all` - Remove todas as músicas

Gerenciamento de Usuários:
- GET `/api/users` - Lista todos os usuários
- GET `/api/user/name` - Busca usuário por nome
- GET `/api/user/data/:id` - Obtém dados de usuário específico
- POST `/api/user/create` - Cria novo usuário
- PUT `/api/user/edit/:id` - Edita usuário existente
- DELETE `/api/user/delete/:id` - Remove usuário específico
- DELETE `/api/user/delete/all` - Remove todos os usuários

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

## Autenticação
- A autenticação é realizada via JWT (JSON Web Token)
- Token necessário para acessar rotas protegidas
- Rotas de administrador requerem privilégios especiais

## Observações
- Todas as rotas protegidas requerem o token JWT no header da requisição
- Rotas administrativas são restritas a usuários com permissões adequadas
- Validações completas implementadas para todas as operações

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

### Songs
- GET `/api/musics`: Lists all available songs.
- GET `/api/music/search`: Searches for songs by specific criteria.
- GET `/api/music/data/:id`: Retrieves detailed data of a specific song.

### Admin
Music Management:
- POST `/api/music/insert`: Adds a new song.
- PUT `/api/music/edit/:id`: Edits an existing song.
- DELETE `/api/music/delete/:id`: Removes a specific song.
- DELETE `/api/music/delete/all`: Removes all songs.

User Management:
- GET `/api/users`: Lists all users.
- GET `/api/user/name`: Searches for a user by name.
- GET `/api/user/data/:id`: Retrieves data of a specific user.
- POST `/api/user/create`: Creates a new user.
- PUT `/api/user/edit/:id`: Edits an existing user.
- DELETE `/api/user/delete/:id`: Removes a specific user.
- DELETE `/api/user/delete/all`: Removes all users.

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

## Authentication
- Authentication is done via JWT (JSON Web Token)
- Token is required to access protected routes
- Admin routes require special privileges

## Notes
- All protected routes require the JWT token in the request header
- Admin routes are restricted to users with appropriate permissions
- Complete validations implemented for all operations