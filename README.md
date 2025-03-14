# 🎵 ProjectSong API

![Node.js](https://img.shields.io/badge/Node.js-16%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21%2B-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Latest-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6.37%2B-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

## 📋 Sobre

API completa para um serviço de streaming de músicas com autenticação, gerenciamento de usuários e controle administrativo. Desenvolvida com Node.js, Express, TypeScript, PostgreSQL e Redis para uma experiência robusta e escalável.

## 🛠️ Tecnologias Principais

- **Backend**: Node.js com Express e TypeScript
- **Banco de Dados**: PostgreSQL com ORM Sequelize
- **Cache e Tokens**: Redis
- **Autenticação**: JWT com blacklist de tokens revogados
- **Segurança**: bcrypt para criptografia de senhas

## 🏗️ Estrutura do Projeto

```
src/
 ├── config/           # Configurações (banco de dados, Redis, upload)
 │   ├── database/     # Configuração do PostgreSQL
 │   ├── multer/       # Configuração de upload de arquivos
 │   └── redis/        # Configuração do Redis
 ├── controllers/      # Controladores para lógica de negócios
 │   ├── admin/        # Controladores administrativos
 │   ├── music/        # Controladores para músicas
 │   └── user/         # Controladores para usuários
 ├── interfaces/       # Definição de tipos e interfaces
 ├── middleware/       # Middleware (autenticação, validação)
 ├── models/           # Modelos de dados e schemas
 ├── routes/           # Definição de rotas da API
 ├── utils/            # Funções utilitárias
 │   ├── auth/         # Utilidades de autenticação
 │   ├── multer/       # Utilidades para upload
 │   └── user/         # Utilidades para usuários
 └── server.ts         # Ponto de entrada da aplicação
```

## 🚀 Funcionalidades

### Autenticação & Usuários
- 🔐 Sistema completo de registro e login
- 👤 Perfis de usuário com níveis de acesso
- 🔄 Atualização de dados de perfil
- 🗑️ Exclusão de conta

### Gerenciamento de Músicas
- 📋 Listagem de músicas disponíveis
- 🔍 Busca por título, artista ou gênero
- 📊 Detalhes completos de cada música

### Funções Administrativas
- 👥 Gerenciamento completo de usuários
- 🎵 Adicionar, editar e remover músicas
- 🛡️ Controle de acesso por função

## ⚙️ Requisitos

- **Node.js** 16 ou superior
- **PostgreSQL** 13 ou superior
- **Redis** 6 ou superior

## 🚦 Começando

### Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/GabrielFinotti/ProjectSong-API.git
   cd ProjectSong-API
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o arquivo .env**
   ```env
   # Servidor
   PORT=3000
   
   # Banco de Dados
   DB_NAME=project_song
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_HOST=localhost
   DB_PORT=5432
   
   # Redis
   REDIS_URL=redis://localhost:6379
   
   # JWT
   SECRET_KEY=sua_chave_secreta
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor com recarga automática
- `npm run build`: Compila o código TypeScript
- `npm start`: Executa a versão compilada
- `npm run lint`: Verifica tipos e sintaxe
- `npm run clean`: Remove a pasta de distribuição

## 📡 Endpoints da API

### 👤 Usuários

| Método | Rota                  | Descrição             | Autenticação |
|--------|----------------------|------------------------|--------------|
| POST   | `/api/user/register` | Registro de usuário    | Não          |
| POST   | `/api/user/login`    | Login                  | Não          |
| GET    | `/api/profile`       | Dados do perfil        | Sim          |
| PUT    | `/api/edit/profile`  | Atualizar perfil       | Sim          |
| DELETE | `/api/delete/profile`| Excluir conta          | Sim          |

### 🎵 Músicas

| Método | Rota                  | Descrição             | Autenticação |
|--------|----------------------|------------------------|--------------|
| GET    | `/api/musics`        | Listar músicas         | Sim          |
| GET    | `/api/music/search`  | Buscar músicas         | Sim          |
| GET    | `/api/music/data/:id`| Detalhes da música     | Sim          |

### 👑 Administração

| Método | Rota                     | Descrição             | Autenticação |
|--------|--------------------------|-----------------------|--------------|
| POST   | `/api/music/insert`      | Adicionar música      | Admin        |
| PUT    | `/api/music/edit/:id`    | Editar música         | Admin        |
| DELETE | `/api/music/delete/:id`  | Remover música        | Admin        |
| GET    | `/api/users`             | Listar usuários       | Admin        |
| PUT    | `/api/user/edit/:id`     | Editar usuário        | Admin        |
| DELETE | `/api/user/delete/:id`   | Remover usuário       | Admin        |

## 🔒 Autenticação

A API usa autenticação JWT. Os tokens devem ser enviados no header:

```
Authorization: Bearer seu_token_aqui
```

Os tokens invalidados (logout) são armazenados em uma blacklist no Redis para garantir que não possam ser reutilizados.

## 💡 Boas Práticas Implementadas

- ✅ Arquitetura em camadas para melhor separação de responsabilidades
- ✅ Validação rigorosa de dados de entrada
- ✅ Tratamento centralizado de erros
- ✅ Criptografia forte para senhas
- ✅ Blacklist de tokens JWT para segurança aprimorada
- ✅ Convenções consistentes de nomenclatura
- ✅ Tipagem forte com TypeScript

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/incrivel`)
3. Commit suas alterações (`git commit -m 'Adiciona recurso incrível'`)
4. Push para a branch (`git push origin feature/incrivel`)
5. Abra um Pull Request

## 📜 Licença

Proprietária © Gabriel Henrique Finotti. Todos os direitos reservados.
