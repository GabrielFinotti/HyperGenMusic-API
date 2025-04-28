<div align="center">
  <img src="https://via.placeholder.com/200x200.png?text=HyperGenMusic+API" alt="HyperGenMusic API Logo" width="200" height="200">
  <h1>HyperGenMusic API</h1>
  <p><strong>Uma API robusta de streaming de música construída com Node.js, TypeScript e Express</strong></p>
  
  [![Node.js](https://img.shields.io/badge/Node.js-16%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Express](https://img.shields.io/badge/Express-4.21%2B-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Redis](https://img.shields.io/badge/Redis-Latest-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
  
  [![Versão](https://img.shields.io/badge/Versão-1.4.0-blue?style=for-the-badge)](https://github.com/GabrielFinotti/HyperGenMusic-API)
  [![Licença](https://img.shields.io/badge/Licença-Proprietária-red?style=for-the-badge)](LICENSE)
</div>

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Recursos](#-recursos)
- [Arquitetura](#-arquitetura)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Documentação da API](#-documentação-da-api)
- [Tecnologias](#-tecnologias)
- [Changelog](#-changelog)
- [Licença](#-licença)

## 🚀 Visão Geral

O HyperGenMusic API é uma infraestrutura backend completa para serviços de streaming de música, projetada com foco em desempenho, segurança e escalabilidade. Construída com TypeScript e Express, esta API implementa os padrões modernos de desenvolvimento, incluindo arquitetura em camadas, injeção de dependências e operações assíncronas eficientes.

### ✨ Destaques da Versão 1.4.0

- Padrão Repository implementado para acesso a dados
- Tratamento detalhado de erros com mensagens descritivas
- Design modular baseado em injeção de dependências
- Melhoria na gestão de transações do banco de dados
- Sistema de paginação aprimorado com parâmetros opcionais
- Operações de imagem otimizadas para edição de músicas
- Limpeza automática de recursos não utilizados

## 🔥 Recursos

### Autenticação & Gerenciamento de Usuários

- Sistema completo de registro e login com validação robusta
- Perfis com diferentes níveis de acesso (usuário e administrador)
- Atualização e exclusão de conta com validação de dados
- Armazenamento seguro de senhas com bcrypt
- Sistema de tokens JWT com blacklist em Redis
- Validação detalhada de dados (formato de email, complexidade de senha)

### Gerenciamento de Músicas

- Catálogo de músicas com metadados completos
- Upload de arquivos de música com validação de formato
- Busca avançada por título, artista ou gênero
- Categorização por gêneros musicais
- Suporte para imagens de capa
- Formatação automática de duração
- Classificação inteligente de conteúdo
- Paginação flexível com parâmetros opcionais de limite e deslocamento

### Painel Administrativo

- Gerenciamento completo de usuários
- Operações CRUD para músicas
- Upload de imagens de capa e arquivos de áudio
- Controle granular de permissões
- Operações em lote para exclusão de conteúdo
- Sincronização automática entre banco de dados e sistema de arquivos
- Edição parcial de recursos com validações robustas

### Segurança Avançada

- Invalidação de tokens após logout
- Proteção contra reutilização de tokens via Redis
- Validação rigorosa de tipos de arquivo para uploads
- Verificação de permissões em cada requisição
- Sanitização de dados de entrada
- Hashing único para nomes de arquivos
- Tratamento adequado de erros com feedback descritivo

## 🏗️ Arquitetura

O HyperGenMusic API segue uma arquitetura em camadas bem definida, garantindo separação de responsabilidades e facilitando a manutenção:

```
src/
 ├── config/            # Configurações do sistema (banco de dados, Redis, Multer)
 ├── controllers/       # Controladores de requisições HTTP
 │   ├── admin/         # Controladores administrativos
 │   ├── music/         # Controladores de música
 │   └── user/          # Controladores de usuário
 ├── middleware/        # Middlewares de autenticação e validação
 │   ├── auth/          # Autenticação e autorização
 │   └── errors/        # Tratamento de erros
 ├── models/            # Modelos de dados (Sequelize)
 ├── repositories/      # Padrão Repository para acesso a dados
 ├── routes/            # Definição de rotas
 ├── services/          # Lógica de negócios
 │   ├── admin/         # Serviços administrativos
 │   ├── music/         # Serviços de música
 │   └── user/          # Serviços de usuário
 ├── types/             # Definições de tipos TypeScript
 │   ├── handling/      # Tipos para tratamento de respostas
 │   ├── music/         # Interfaces relacionadas a músicas
 │   ├── repositories/  # Interfaces dos repositórios
 │   ├── services/      # Interfaces dos serviços
 │   └── user/          # Interfaces relacionadas a usuários
 ├── utils/             # Funções utilitárias
 │   ├── auth/          # Utilitários de autenticação e verificação
 │   ├── handlings/     # Manipuladores de resposta padronizados
 │   └── uploads/       # Gerenciamento de uploads e arquivos
 └── server.ts          # Ponto de entrada da aplicação
```

### Princípios de Design

- **Separação de Responsabilidades**: Cada camada tem uma função específica e bem delimitada
- **Injeção de Dependências**: Componentes recebem suas dependências, reduzindo acoplamento
- **Design por Contrato**: Interfaces bem definidas para serviços e repositórios
- **Tratamento de Erros Centralizado**: Sistema padronizado de resposta e tratamento de erros
- **Validação em Camadas**: Validação de dados em múltiplos níveis (controlador, serviço, modelo)
- **Repository Pattern**: Abstração da camada de acesso a dados permitindo maior testabilidade
- **Princípio DRY (Don't Repeat Yourself)**: Reutilização de código através de utilitários compartilhados
- **Transparência de Falhas**: Erros são tratados, registrados e comunicados de maneira consistente

## 📋 Requisitos

- **Node.js**: 16.x ou superior
- **PostgreSQL**: 13.x ou superior
- **Redis**: 6.x ou superior
- **Espaço em Disco**: Mínimo de 1GB disponível para armazenamento de músicas e imagens

## ⚙️ Instalação

### Configuração do Ambiente

1. **Clone o repositório**

   ```bash
   git clone https://github.com/GabrielFinotti/HyperGenMusic-API.git
   cd HyperGenMusic-API
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

## 📚 Documentação da API

### Endpoints

<details>
  <summary><b>🔐 Autenticação e Usuários</b></summary>
  
  | Método | Endpoint | Descrição | Autenticação |
  |--------|----------|-----------|--------------|
  | `POST` | `/api/user/register` | Registrar novo usuário | Não |
  | `POST` | `/api/user/login` | Efetuar login | Não |
  | `GET` | `/api/profile` | Obter perfil do usuário | Sim |
  | `PUT` | `/api/edit/profile` | Atualizar perfil | Sim |
  | `DELETE` | `/api/delete/profile` | Excluir conta | Sim |

</details>

<details>
  <summary><b>🎵 Músicas</b></summary>
  
  | Método | Endpoint | Descrição | Autenticação |
  |--------|----------|-----------|--------------|
  | `GET` | `/api/musics` | Listar músicas | Sim |
  | `GET` | `/api/music/search?q=termo` | Buscar músicas | Sim |
  | `GET` | `/api/music/data/:id` | Detalhes da música | Sim |

</details>

<details>
  <summary><b>👑 Administração</b></summary>
  
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
  | `DELETE` | `/api/user/delete/all` | Excluir todos usuários | Admin |

</details>

### Autenticação

A API utiliza autenticação baseada em JWT. Os tokens devem ser enviados no cabeçalho HTTP:

```http
Authorization: Bearer seu_token_jwt
```

### Exemplos de Requisições

<details>
  <summary><b>Login</b></summary>
  
  ```http
  POST /api/user/login
  Content-Type: application/json

{
"email": "usuario@exemplo.com",
"password": "Senha123!"
}

````

Resposta:

```json
{
  "message": "Usuário logado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
````

</details>

<details>
  <summary><b>Listar Músicas</b></summary>
  
  ```http
  GET /api/musics
  Authorization: Bearer seu_token_jwt
  ```

Resposta:

```json
{
  "message": "Músicas recuperadas com sucesso",
  "musics": [
    {
      "id": 1,
      "title": "Nome da Música",
      "artist": "Nome do Artista",
      "imageUrl": "http://localhost:3000/uploads/images/abcdef123456.jpg",
      "duration": 180
    }
    // ...mais músicas
  ]
}
```

</details>

## 🔧 Tecnologias

- **Backend**:
  - Node.js - Ambiente de execução JavaScript
  - Express - Framework web
  - TypeScript - Superset tipado de JavaScript
- **Banco de Dados**:
  - PostgreSQL - Banco de dados relacional
  - Sequelize - ORM para interação com o banco
- **Cache**:
  - Redis - Armazenamento em memória para blacklist de tokens e cache
- **Segurança**:
  - JWT (JSON Web Tokens) - Para autenticação
  - bcrypt - Para hash de senhas
- **Upload de Arquivos**:
  - Multer - Middleware para manipulação de arquivos

## 📈 Changelog

### 1.4.0 (Atual)

- Padrão Repository implementado para acesso a dados
- Tratamento detalhado de erros com mensagens descritivas
- Design modular baseado em injeção de dependências
- Melhoria na gestão de transações do banco de dados
- Sistema de paginação aprimorado com parâmetros opcionais
- Operações de imagem otimizadas para edição de músicas
- Limpeza automática de recursos não utilizados

### 1.3.0

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

## 📝 Licença

Proprietária © Gabriel Henrique Finotti. Todos os direitos reservados.

Este software e seus arquivos associados são propriedade exclusiva de Gabriel Henrique Finotti.
Você não tem permissão para usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar
e/ou vender cópias do Software sem permissão expressa por escrito do proprietário.

---

<div align="center">
  <sub>Desenvolvido com ❤️ por Gabriel Henrique Finotti</sub>
  <br>
  <sub>© 2024 • Todos os direitos reservados</sub>
</div>
