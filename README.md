# 🎵 ProjectSong API

![Node.js](https://img.shields.io/badge/Node.js-16%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21%2B-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Latest-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6.37%2B-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

## 📑 Índice

- [Sobre](#-sobre)
- [Novidades](#-novidades)
- [Tecnologias](#️-tecnologias)
- [Estrutura do Projeto](#️-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Requisitos](#️-requisitos)
- [Instalação](#-instalação)
- [API Endpoints](#-api-endpoints)
- [Autenticação](#-autenticação)
- [Principais Recursos](#-principais-recursos)
- [Boas Práticas](#-boas-práticas-implementadas)
- [Extensibilidade](#️-extensibilidade-e-manutenção)
- [Contribuições](#-contribuições)
- [Changelog](#-changelog)
- [Licença](#-licença)

## 📋 Sobre

ProjectSong API é uma solução completa de backend para serviços de streaming de música, oferecendo:

- Sistema robusto de autenticação e gerenciamento de usuários
- Controle administrativo com diferentes níveis de permissão
- Gerenciamento eficiente de arquivos de música e metadados
- Arquitetura escalável construída com TypeScript e Express
- Persistência de dados com PostgreSQL e cache com Redis

Desenvolvida com foco em desempenho, segurança e escalabilidade.

## 🚀 Novidades

### Versão 1.3.0 (Atual)

- 📁 **Estrutura de controladores refatorada**: Organização em camadas com responsabilidades bem definidas
- 🎮 **Design modular aprimorado**: Gerenciamento de recursos mais consistente e intuitivo
- 🔄 **Injeção de dependências avançada**: Melhor separação de responsabilidades entre serviços
- ⚙️ **Implementação de design patterns**: Padrões robustos em serviços e controllers
- 📊 **Sistema de logs aprimorado**: Feedback detalhado e colorizado para debugging
- 🌐 **Estruturação inteligente de rotas**: Organização mais intuitiva de endpoints

[Ver histórico completo de versões](#-changelog)

## 🛠️ Tecnologias

| Categoria | Tecnologias |
|-----------|------------|
| **Backend Base** | Node.js, Express, TypeScript |
| **Banco de Dados** | PostgreSQL, Sequelize ORM |
| **Cache & Tokens** | Redis |
| **Autenticação** | JWT com blacklist em Redis |
| **Segurança** | bcrypt para senhas |
| **Upload de Arquivos** | Multer |
| **Armazenamento** | Sistema de arquivos local |

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
 ├── middleware/       # Middleware (autenticação, validação)
 │   ├── auth/         # Autenticação e verificação de permissões
 │   └── errors/       # Manipulação centralizada de erros
 ├── models/           # Modelos de dados e schemas
 ├── routes/           # Definição de rotas da API
 │   ├── admin/        # Rotas administrativas
 │   ├── music/        # Rotas para músicas
 │   └── user/         # Rotas para usuários
 ├── services/         # Camada de serviços para lógica de negócios
 │   ├── admin/        # Serviços administrativos
 │   ├── music/        # Serviços para músicas
 │   └── user/         # Serviços para usuários
 ├── types/            # Definição de tipos e interfaces
 │   ├── music/        # Tipos relacionados a músicas
 │   ├── uploads/      # Tipos relacionados a uploads
 │   └── user/         # Tipos relacionados a usuários
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
- 🎧 Metadados avançados com informações de artista
- 🖼️ Suporte para imagens de capa

### Funções Administrativas
- 👥 Gerenciamento completo de usuários
- 🎵 Adicionar, editar e remover músicas
- 🖼️ Upload de imagens de capa para músicas
- 🔊 Upload de arquivos de áudio em formatos MP3, WAV e OGG
- 🛡️ Controle de acesso por função administrativa
- 🗑️ Operações em lote para exclusão de conteúdo
- 🧹 **NOVO**: Sistema avançado de exclusão de músicas com limpeza de arquivos
- 🔄 **NOVO**: Sincronização automática entre o banco de dados e sistema de arquivos

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

## 🚦 Instalação

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

## 📡 API Endpoints

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

| Método | Rota                             | Descrição                    | Autenticação |
|--------|---------------------------------|------------------------------|--------------|
| POST   | `/api/music/insert`              | Adicionar música com upload  | Admin        |
| PUT    | `/api/music/edit/:musicId`       | Editar música                | Admin        |
| DELETE | `/api/music/delete/musicId/:musicId`| Remover música específica  | Admin        |
| DELETE | `/api/music/delete/all`          | Remover todas as músicas     | Admin        |
| GET    | `/api/users`                     | Listar usuários              | Admin        |
| GET    | `/api/user/name`                 | Buscar usuário por nome      | Admin        |
| GET    | `/api/user/data/:userId`         | Detalhes do usuário          | Admin        |
| POST   | `/api/user/create`               | Criar novo usuário           | Admin        |
| PUT    | `/api/user/edit/:userid`         | Editar usuário               | Admin        |
| DELETE | `/api/user/delete/userId/:userId`| Remover usuário              | Admin        |
| DELETE | `/api/user/delete/all`           | Remover todos os usuários    | Admin        |

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

## 📦 Principais Recursos

### 🗑️ Gerenciamento Avançado de Músicas

Sistema completo para gerenciar o ciclo de vida das músicas:

- Exclusão individual de músicas com limpeza coordenada de arquivos
- Remoção em lote de todo o catálogo musical
- Sincronização entre banco de dados e sistema de arquivos
- Tratamento de falhas durante o processo de exclusão

### 🔄 Arquitetura em Camadas

A arquitetura foi refatorada para seguir um padrão de camadas bem definido:

- **Controllers**: Manipulam requisições HTTP e respostas
- **Services**: Contêm a lógica de negócios principal
- **Models**: Definem a estrutura dos dados e interação com o banco
- **Utils**: Fornecem funções auxiliares reutilizáveis

Esta separação melhora a manutenibilidade, testabilidade e escalabilidade do código.

### 🧩 Injeção de Dependências

Implementação de um sistema simples de injeção de dependências para:

- Facilitar testes unitários através de mocks
- Reduzir acoplamento entre componentes
- Melhorar a modularidade do código

### 📊 Metadados de Música Expandidos

O modelo de música foi aprimorado com:

- Suporte a informações de artista
- Categorização por gênero musical
- Formatação automática de duração
- Detecção de músicas longas

### 🔍 Validação Aprimorada

Sistema de validação de dados com:

- Feedback detalhado sobre erros de validação
- Tratamento específico para cada tipo de campo
- Verificações de complexidade para senhas
- Validação de unicidade para emails e usernames

### 🧹 Gestão de Recursos

Melhores práticas para gerenciamento de recursos:

- Limpeza automática de uploads temporários
- Verificação de diretórios em tempo de execução
- Manipulação segura de arquivos
- Validação estrita de tipos MIME
- **NOVO**: Exclusão coordenada de arquivos e registros do banco de dados

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
- ✅ Serviços especializados para diferentes domínios da aplicação

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

## 📝 Changelog

### 1.3.0 (Atual)
- Estrutura de controladores refatorada para melhor organização
- Design modular aprimorado para gerenciamento de recursos
- Injeção de dependências aprimorada para separação de responsabilidades
- Implementação robusta de padrões de projeto em serviços e controllers
- Sistema de logging detalhado com feedback colorizado
- Melhor integração e estruturação de rotas

### 1.2.0
- Sistema avançado para exclusão de músicas individuais e em lote
- Limpeza coordenada de arquivos e registros no banco de dados
- Tratamento robusto de erros durante o processo de exclusão
- Melhorias na API administrativa para gerenciamento completo do conteúdo
- Sincronização aprimorada entre sistema de arquivos e banco de dados

### 1.1.0
- Refatoração para arquitetura em camadas
- Adição de novos metadados para músicas
- Sistema aprimorado de gestão de uploads
- Validação expandida com feedback detalhado
- Melhor tratamento de erros

### 1.0.0 (Inicial)
- Implementação básica de autenticação de usuários
- Sistema de upload de arquivos
- Gestão de músicas e playlists
- Controle de acesso baseado em função

## 📜 Licença

Proprietária © Gabriel Henrique Finotti. Todos os direitos reservados.
