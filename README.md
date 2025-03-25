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
- **Cache e Tokens**: Redis para armazenamento de tokens revogados
- **Autenticação**: JWT com blacklist de tokens em Redis
- **Segurança**: bcrypt para criptografia de senhas
- **Upload de Arquivos**: Multer para gerenciamento de uploads de músicas e imagens
- **Armazenamento**: Sistema de arquivos local para músicas e imagens

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
 │   └── auth/         # Autenticação e verificação de permissões
 ├── models/           # Modelos de dados e schemas
 ├── routes/           # Definição de rotas da API
 │   ├── admin/        # Rotas administrativas
 │   ├── music/        # Rotas para músicas
 │   └── user/         # Rotas para usuários
 ├── utils/            # Funções utilitárias
 │   ├── auth/         # Utilidades de autenticação
 │   ├── uploads/      # Utilidades para gerenciamento de diretórios
 │   └── user/         # Utilidades para usuários
 └── server.ts         # Ponto de entrada da aplicação
```

## 🚀 Funcionalidades

### Autenticação & Usuários
- 🔐 Sistema completo de registro e login com validação robusta
- 👤 Perfis de usuário com níveis de acesso (usuário comum e administrador)
- 🔄 Atualização de dados de perfil com validação de unicidade
- 🗑️ Exclusão de conta com revogação automática de token
- 🔒 Armazenamento seguro de senhas com hash bcrypt
- 🛡️ Controle de acesso baseado em tokens JWT
- 📝 Validação detalhada de dados de usuário (formato de email, complexidade de senha)

### Gerenciamento de Músicas
- 📋 Listagem de músicas disponíveis
- 🔍 Busca por título, artista ou gênero
- 📊 Detalhes completos de cada música
- ⏱️ Exibição de duração formatada automaticamente
- 🏷️ Categorização por gêneros musicais
- 🖼️ Suporte para imagens de capa

### Funções Administrativas
- 👥 Gerenciamento completo de usuários
- 🎵 Adicionar, editar e remover músicas
- 🖼️ Upload de imagens de capa para músicas
- 🔊 Upload de arquivos de áudio em formatos MP3, WAV e OGG
- 🛡️ Controle de acesso por função administrativa
- 🗑️ Operações em lote para exclusão de conteúdo

### Segurança Avançada
- 🔐 Sistema de invalidação de tokens após logout
- 🛡️ Proteção contra reutilização de tokens revogados via Redis
- 🔒 Validação rigorosa de tipos de arquivo para uploads
- 🔍 Verificação de permissões em cada requisição
- 🧩 Sanitização de dados de entrada
- 🔐 Hashing único para nomes de arquivos

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

| Método | Rota                     | Descrição                    | Autenticação |
|--------|--------------------------|------------------------------|--------------|
| POST   | `/api/music/insert`      | Adicionar música com upload  | Admin        |
| PUT    | `/api/music/edit/:id`    | Editar música                | Admin        |
| DELETE | `/api/music/delete/:id`  | Remover música               | Admin        |
| DELETE | `/api/music/delete/all`  | Remover todas as músicas     | Admin        |
| GET    | `/api/users`             | Listar usuários              | Admin        |
| GET    | `/api/user/name`         | Buscar usuário por nome      | Admin        |
| GET    | `/api/user/data/:id`     | Detalhes do usuário          | Admin        |
| POST   | `/api/user/create`       | Criar novo usuário           | Admin        |
| PUT    | `/api/user/edit/:id`     | Editar usuário               | Admin        |
| DELETE | `/api/user/delete/:id`   | Remover usuário              | Admin        |
| DELETE | `/api/user/delete/all`   | Remover todos os usuários    | Admin        |

## 📤 Upload de Arquivos

A API suporta upload de arquivos para:

- **Imagens**: Formatos PNG e JPEG, limite de 20MB
- **Músicas**: Formatos MP3, WAV e OGG, limite de 400MB

Os arquivos são armazenados em diretórios específicos:
- `/uploads/images` para imagens
- `/uploads/music` para arquivos de áudio

### Gerenciamento Seguro de Uploads

- Validação rigorosa de tipos MIME para segurança
- Geração de nomes de arquivo aleatórios usando hash criptográfico para evitar colisões
- Verificação e criação automática de diretórios de upload durante inicialização
- Filtros de arquivo para garantir que o tipo correto seja enviado em cada campo
- Tratamento robusto de erros durante o upload
- Limites configuráveis de tamanho de arquivo por tipo

Exemplo de requisição para inserir música (utilizando FormData):
```javascript
const formData = new FormData();
formData.append('music', arquivoDeAudio);
formData.append('image', imagemDeCapa);
formData.append('title', 'Nome da Música');
formData.append('artist', 'Nome do Artista');
formData.append('genre', 'Gênero Musical');
formData.append('duration', '180'); // Duração em segundos

fetch('/api/music/insert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer seu_token_aqui'
  },
  body: formData
});
```

## 🔒 Autenticação

A API usa autenticação JWT. Os tokens devem ser enviados no header:

```
Authorization: Bearer seu_token_aqui
```

### Sistema de Revogação de Tokens

Os tokens invalidados (após logout) são armazenados em uma blacklist no Redis para garantir que não possam ser reutilizados, mesmo estando dentro do prazo de validade.

- Tempo de expiração adaptativo baseado no tempo restante do token
- Verificação eficiente usando Redis como armazenamento de chave-valor
- Prevenção de ataques de replay mesmo com tokens anteriormente válidos

## 💡 Boas Práticas Implementadas

- ✅ Arquitetura em camadas para melhor separação de responsabilidades
- ✅ Validação rigorosa de dados de entrada com feedback detalhado de erros
- ✅ Tratamento centralizado de erros com mensagens contextuais
- ✅ Criptografia forte para senhas usando bcrypt com salt
- ✅ Blacklist de tokens JWT em Redis para segurança aprimorada
- ✅ Convenções consistentes de nomenclatura e estrutura de código
- ✅ Tipagem forte com TypeScript em toda a aplicação
- ✅ Gerenciamento seguro de uploads de arquivos com verificação de MIME type
- ✅ Verificação automática de diretórios em tempo de execução
- ✅ Nomenclatura aleatória para arquivos usando hash criptográfico
- ✅ Validação de unicidade para dados críticos como email e nome de usuário
- ✅ Transformação de dados nos modelos para garantir consistência

## 🛠️ Extensibilidade e Manutenção

O projeto foi desenvolvido com foco em extensibilidade e facilidade de manutenção:

- Interfaces bem definidas para todos os modelos de dados
- Abstração de funções comuns em utilitários reutilizáveis
- Centralização de configurações para fácil ajuste
- Middlewares modulares para inclusão condicional
- Modelos com métodos de formatação e validação integrados
- Logs detalhados com cores para melhor depuração

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/incrivel`)
3. Commit suas alterações (`git commit -m 'Adiciona recurso incrível'`)
4. Push para a branch (`git push origin feature/incrivel`)
5. Abra um Pull Request

## 📜 Licença

Proprietária © Gabriel Henrique Finotti. Todos os direitos reservados.
