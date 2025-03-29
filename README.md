# ProjectSong API

<div align="center">

![Logo do ProjectSong API](https://via.placeholder.com/150x150.png?text=ProjectSong)

[![Node.js](https://img.shields.io/badge/Node.js-16%2B-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21%2B-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Latest-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.37%2B-52B0E7?style=flat-square&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![Licença](https://img.shields.io/badge/Licença-Proprietária-red?style=flat-square)](LICENSE)

**API de streaming de música robusta, escalável e de alta performance**

[Visão Geral](#visão-geral) • 
[Recursos](#principais-recursos) • 
[Instalação](#instalação) • 
[Documentação](#documentação-da-api) • 
[Tecnologias](#tecnologias) • 
[Licença](#licença)

</div>

## Visão Geral

O ProjectSong API é uma infraestrutura backend completa para serviços de streaming de música, projetada com foco em desempenho, segurança e escalabilidade. Construída com TypeScript e Express, esta API oferece um conjunto abrangente de funcionalidades para gerenciamento de usuários, controle de conteúdo musical e administração de sistema.

### Versão Atual: 1.3.0

**Destaques da versão:**
- Arquitetura em camadas com responsabilidades bem definidas
- Design modular aprimorado para melhor organização de código
- Injeção de dependências avançada
- Implementação de padrões de projeto modernos
- Sistema de logging detalhado e colorizado

## Principais Recursos

<details>
<summary><b>🔐 Autenticação & Gerenciamento de Usuários</b></summary>

- Sistema completo de registro e login com validação robusta
- Perfis com diferentes níveis de acesso (usuário e administrador)
- Atualização e exclusão de conta com validação de dados
- Armazenamento seguro de senhas com bcrypt
- Sistema de tokens JWT com blacklist em Redis
- Validação detalhada de dados (formato de email, complexidade de senha)
</details>

<details>
<summary><b>🎵 Gerenciamento de Músicas</b></summary>

- Catálogo de músicas com metadados completos
- Busca avançada por título, artista ou gênero
- Categorização por gêneros musicais
- Suporte para imagens de capa
- Formatação automática de duração 
- Classificação inteligente de conteúdo
</details>

<details>
<summary><b>👑 Painel Administrativo</b></summary>

- Gerenciamento completo de usuários
- Operações CRUD para músicas
- Upload de imagens de capa e arquivos de áudio
- Controle granular de permissões
- Operações em lote para exclusão de conteúdo
- Sincronização automática entre banco de dados e sistema de arquivos
</details>

<details>
<summary><b>🛡️ Segurança Avançada</b></summary>

- Invalidação de tokens após logout
- Proteção contra reutilização de tokens via Redis
- Validação rigorosa de tipos de arquivo para uploads
- Verificação de permissões em cada requisição
- Sanitização de dados de entrada
- Hashing único para nomes de arquivos
</details>

## Requisitos

- **Node.js**: 16.x ou superior
- **PostgreSQL**: 13.x ou superior
- **Redis**: 6.x ou superior

## Instalação

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

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

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

4. **Inicie o servidor**
   ```bash
   # Desenvolvimento
   npm run dev
   
   # Produção
   npm run build
   npm start
   ```

## Documentação da API

### Endpoints

#### Autenticação e Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/api/user/register` | Registrar novo usuário | Não |
| `POST` | `/api/user/login` | Efetuar login | Não |
| `GET` | `/api/profile` | Obter perfil do usuário | Sim |
| `PUT` | `/api/edit/profile` | Atualizar perfil | Sim |
| `DELETE` | `/api/delete/profile` | Excluir conta | Sim |

#### Músicas

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/musics` | Listar músicas | Sim |
| `GET` | `/api/music/search?q=termo` | Buscar músicas | Sim |
| `GET` | `/api/music/data/:id` | Detalhes da música | Sim |

#### Administração

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/api/music/insert` | Adicionar música | Admin |
| `PUT` | `/api/music/edit/:musicId` | Editar música | Admin |
| `DELETE` | `/api/music/delete/musicId/:musicId` | Excluir música | Admin |
| `DELETE` | `/api/music/delete/all` | Excluir todas as músicas | Admin |
| `GET` | `/api/users` | Listar usuários | Admin |
| `GET` | `/api/user/search?q=termo` | Buscar usuário | Admin |
| `POST` | `/api/user/create` | Criar usuário | Admin |
| `PUT` | `/api/user/edit/:userid` | Editar usuário | Admin |
| `DELETE` | `/api/user/delete/userId/:userId` | Excluir usuário | Admin |

### Autenticação

A API utiliza autenticação baseada em JWT. Os tokens devem ser enviados no cabeçalho HTTP:

```http
Authorization: Bearer seu_token_jwt
```

## Arquitetura

O ProjectSong API segue uma arquitetura em camadas bem definida:

```
src/
 ├── config/          # Configurações do sistema
 ├── controllers/     # Controladores de requisições HTTP
 ├── middleware/      # Middlewares de autenticação e validação
 ├── models/          # Modelos de dados (Sequelize)
 ├── routes/          # Definição de rotas
 ├── services/        # Lógica de negócios
 ├── types/           # Definições de tipos TypeScript
 ├── utils/           # Funções utilitárias
 └── server.ts        # Ponto de entrada da aplicação
```

## Tecnologias

- **Backend**: Node.js, Express, TypeScript
- **Banco de Dados**: PostgreSQL com Sequelize ORM
- **Cache**: Redis para blacklist de tokens e cache
- **Autenticação**: JWT (JSON Web Tokens)
- **Upload de Arquivos**: Multer
- **Segurança**: bcrypt para hash de senhas

## Desenvolvimento

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor com hot-reload
- `npm run build`: Compila o código TypeScript
- `npm start`: Executa a versão compilada
- `npm run lint`: Verifica tipos e sintaxe
- `npm run clean`: Remove o diretório de distribuição

## Boas Práticas

- ✅ Arquitetura em camadas com separação clara de responsabilidades
- ✅ Validação rigorosa de dados com feedback detalhado
- ✅ Tratamento centralizado de erros
- ✅ Padrões de projeto modernos
- ✅ Injeção de dependências
- ✅ Logging detalhado para depuração
- ✅ Tipagem forte com TypeScript
- ✅ Gestão segura de uploads

## Changelog

### 1.3.0 (Atual)
- Refatoração da estrutura de controladores
- Design modular aprimorado
- Injeção de dependências avançada
- Implementação de padrões de projeto
- Sistema de logging colorizado
- Melhor estruturação de rotas

### 1.2.0
- Sistema avançado para exclusão de músicas
- Limpeza coordenada de arquivos e registros
- Melhorias na API administrativa
- Sincronização entre sistema de arquivos e banco de dados

### 1.1.0
- Arquitetura em camadas
- Novos metadados para músicas
- Gestão aprimorada de uploads
- Validação expandida

### 1.0.0
- Implementação básica de autenticação
- Sistema de upload de arquivos
- Gestão de músicas
- Controle de acesso baseado em função

## Contribuições

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit de suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## Licença

Proprietária © Gabriel Henrique Finotti. Todos os direitos reservados.

---

<div align="center">
<sub>Desenvolvido com ❤️ por Gabriel Henrique Finotti</sub>
</div>
