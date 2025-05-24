<div align="center">
  <img src="https://via.placeholder.com/200x200.png?text=HyperGenMusic+API" alt="HyperGenMusic API Logo" width="200" height="200">
  
# 🎵 HyperGenMusic API
  
  <p><strong>Uma API robusta de streaming de música construída com Node.js, TypeScript e Express</strong></p>
  
  [![Node.js](https://img.shields.io/badge/Node.js-16%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Express](https://img.shields.io/badge/Express-4.21%2B-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Redis](https://img.shields.io/badge/Redis-Latest-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
  
  [![Versão](https://img.shields.io/badge/Versão-2.0.0--dev-orange?style=for-the-badge)](https://github.com/GabrielFinotti/HyperGenMusic-API)
  [![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)](https://github.com/GabrielFinotti/HyperGenMusic-API)
  [![Licença](https://img.shields.io/badge/Licença-Proprietária-red?style=for-the-badge)](LICENSE)

  > ⚠️ **Esta é uma versão em desenvolvimento ativa. Recursos podem mudar sem aviso prévio.**
</div>

---

## 📖 Índice

- [🚀 Visão Geral](#-visão-geral)
- [✨ Recursos](#-recursos)
- [🏗️ Arquitetura](#️-arquitetura)
- [📋 Requisitos](#-requisitos)
- [⚙️ Instalação](#️-instalação)
- [📚 Documentação da API](#-documentação-da-api)
- [🔧 Tecnologias](#-tecnologias)
- [🗺️ Roadmap](#️-roadmap)
- [📈 Changelog](#-changelog)
- [🤝 Contribuição](#-contribuição)
- [📝 Licença](#-licença)

---

## 🚀 Visão Geral

O **HyperGenMusic API** é uma solução backend completa e moderna para serviços de streaming de música, desenvolvida com foco em **performance**, **segurança** e **escalabilidade**.

Construída com **TypeScript** e **Express**, esta API implementa as melhores práticas de desenvolvimento moderno, incluindo arquitetura em camadas, padrões de design robustos e operações assíncronas otimizadas.

### 🎯 Objetivos do Projeto

- Fornecer uma API RESTful robusta para streaming de música
- Implementar autenticação segura com JWT e Redis
- Oferecer gerenciamento completo de usuários e conteúdo musical
- Garantir escalabilidade e performance em produção
- Manter código limpo e bem documentado

---

## ✨ Recursos

### 🔐 **Sistema de Autenticação Avançado**

- ✅ Registro e login com validação robusta
- ✅ Autenticação JWT com blacklist em Redis
- ✅ Níveis de acesso diferenciados (usuário/admin)
- ✅ Proteção contra reutilização de tokens
- ✅ Hash seguro de senhas com bcrypt

### 🎵 **Gerenciamento de Músicas**

- ✅ Catálogo completo com metadados estruturados
- ✅ Upload otimizado de arquivos de áudio
- ✅ Sistema de busca avançada (título, artista, gênero)
- ✅ Categorização inteligente por gêneros
- ✅ Suporte para imagens de capa
- ✅ Paginação flexível e performática

### 👨‍💼 **Painel Administrativo**

- ✅ CRUD completo para usuários e músicas
- ✅ Upload de múltiplos tipos de arquivo
- ✅ Operações em lote para gestão de conteúdo
- ✅ Sincronização automática de recursos
- ✅ Controle granular de permissões

### 🛡️ **Segurança de Primeira Classe**

- ✅ Validação rigorosa de entrada
- ✅ Sanitização automática de dados
- ✅ Controle de tipos de arquivo para uploads
- ✅ Rate limiting e proteção CORS
- ✅ Tratamento centralizado de erros

---

## 🏗️ Arquitetura

A API segue uma **arquitetura em camadas** moderna, garantindo separação clara de responsabilidades:

```
src/
├── 📁 config/          # Configurações (Database, Redis, Multer)
├── 📁 controllers/     # Controladores HTTP
├── 📁 middlewares/     # Middlewares (Auth, Validation)
├── 📁 models/          # Modelos Sequelize
├── 📁 routes/          # Definições de rotas
│   ├── 📄 user_router.ts
│   ├── 📄 music_router.ts
│   └── 📄 admin_router.ts
├── 📁 services/        # Lógica de negócios
├── 📁 types/           # Definições TypeScript
├── 📁 utils/           # Funções utilitárias
└── 📄 server.ts        # Ponto de entrada
```

### 🏛️ Princípios de Design

- **🔄 Separation of Concerns**: Responsabilidades bem delimitadas
- **🔌 Dependency Injection**: Baixo acoplamento entre componentes
- **📋 Design by Contract**: Interfaces bem definidas
- **🚨 Centralized Error Handling**: Tratamento padronizado de erros
- **🔍 Repository Pattern**: Abstração da camada de dados
- **♻️ DRY Principle**: Reutilização eficiente de código

---

## 📋 Requisitos

| Tecnologia | Versão Mínima | Status |
|------------|---------------|--------|
| **Node.js** | 16.x | ✅ Obrigatório |
| **PostgreSQL** | 13.x | ✅ Obrigatório |
| **Redis** | 6.x | ✅ Obrigatório |
| **Espaço em Disco** | 1GB | ✅ Recomendado |

---

## ⚙️ Instalação

### 🚀 Início Rápido

```bash
# 1. Clone o repositório
git clone https://github.com/GabrielFinotti/HyperGenMusic-API.git
cd HyperGenMusic-API

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Execute em modo desenvolvimento
npm run dev
```

### 🔧 Configuração Detalhada

<details>
<summary><b>📝 Variáveis de Ambiente</b></summary>

Crie um arquivo `.env` na raiz do projeto:

```env
# 🌐 Servidor
PORT=3000

# 🗄️ Banco de Dados PostgreSQL
DB_NAME=hypergenmusic_db
DB_USER=seu_usuario
DB_PASSWORD=sua_senha_segura
DB_HOST=localhost
DB_PORT=5432

# 🔴 Redis Cache
REDIS_URL=redis://localhost:6379

# 🔐 JWT Security
SECRET_KEY=sua_chave_secreta_muito_forte_aqui
JWT_EXPIRES_IN=24h

# 📁 Upload Configuration
MAX_FILE_SIZE=50MB
ALLOWED_AUDIO_FORMATS=mp3,wav,flac
ALLOWED_IMAGE_FORMATS=jpg,jpeg,png,webp
```

</details>

### 🎯 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento com hot-reload
npm run build    # Compilação para produção
npm start        # Execução em produção
npm run test     # Executar testes (em desenvolvimento)
```

---

## 📚 Documentação da API

> **Base URL**: `http://localhost:3000/api/v2`

### 🔐 **Autenticação e Usuários**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/auth/register` | Registro de novo usuário | ❌ |
| `POST` | `/auth/login` | Login do usuário | ❌ |
| `DELETE` | `/auth/delete` | Excluir conta própria | ✅ |
| `GET` | `/profile` | Dados do perfil | ✅ |
| `PUT` | `/profile/update` | Atualizar perfil | ✅ |

### 🎵 **Músicas**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/musics` | Listar todas as músicas | ✅ |
| `GET` | `/musics/search?q={termo}` | Buscar músicas | ✅ |
| `GET` | `/musics/genre?genre={genero}` | Músicas por gênero | ✅ |
| `GET` | `/music/data/{musicId}` | Detalhes da música | ✅ |

### 👑 **Administração** (Em Desenvolvimento)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/admin/users` | Listar usuários | 👑 Admin |
| `POST` | `/admin/music/create` | Adicionar música | 👑 Admin |
| `PUT` | `/admin/music/{id}` | Editar música | 👑 Admin |
| `DELETE` | `/admin/music/{id}` | Excluir música | 👑 Admin |

### 🔑 **Autenticação**

Envie o token JWT no cabeçalho de autorização:

```http
Authorization: Bearer {seu_token_jwt}
```

### 📝 **Exemplos de Uso**

<details>
<summary><b>🔐 Login de Usuário</b></summary>

```http
POST /api/v2/auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "MinhaSenh@123"
}
```

**Resposta:**

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "usuario@exemplo.com",
      "role": "user"
    }
  }
}
```

</details>

<details>
<summary><b>🎵 Buscar Músicas</b></summary>

```http
GET /api/v2/musics/search?q=rock
Authorization: Bearer {token}
```

**Resposta:**

```json
{
  "success": true,
  "message": "Músicas encontradas",
  "data": {
    "musics": [
      {
        "id": 1,
        "title": "Rock Anthem",
        "artist": "The Rockers",
        "genre": "Rock",
        "duration": 240,
        "imageUrl": "/uploads/covers/rock-anthem.jpg"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10
    }
  }
}
```

</details>

---

## 🔧 Tecnologias

### 🏗️ **Core Stack**

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js 16+** - Runtime JavaScript
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) **TypeScript 5.7+** - Superset tipado
- ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) **Express 4.21+** - Framework web

### 🗄️ **Database & Cache**

- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) **PostgreSQL** - Banco principal
- ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) **Redis** - Cache e sessões
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white) **Sequelize** - ORM

### 🔐 **Security & Auth**

- ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) **JSON Web Tokens** - Autenticação
- **bcrypt** - Hash de senhas
- **CORS** - Cross-Origin Resource Sharing

### 🛠️ **Development Tools**

- **tsx** - TypeScript execution
- **tsup** - Build tool
- **Multer** - File upload handling

---

## 🗺️ Roadmap

### 🚧 **Versão 2.0 (Em Desenvolvimento)**

- [ ] **API Admin Completa**
  - [ ] CRUD completo de usuários
  - [ ] Gerenciamento avançado de músicas
  - [ ] Dashboard administrativo
  
- [ ] **Melhorias de Performance**
  - [ ] Implementação de cache avançado
  - [ ] Otimização de queries
  - [ ] Compressão de respostas

- [ ] **Recursos Avançados**
  - [ ] Playlists de usuários
  - [ ] Sistema de favoritos
  - [ ] Streaming de áudio
  - [ ] Upload para AWS S3

### 🔮 **Versões Futuras**

- [ ] **v2.1**: Sistema de playlists
- [ ] **v2.2**: API de streaming em tempo real
- [ ] **v2.3**: Machine Learning para recomendações
- [ ] **v3.0**: Microserviços e containerização

---

## 📈 Changelog

### 🚀 **v2.0.0-dev** (Em Desenvolvimento)

- 🔄 Reestruturação completa das rotas
- ✨ Nova arquitetura em camadas
- 🛡️ Sistema de segurança aprimorado
- 📚 Documentação modernizada
- 🎯 Foco em padrões de desenvolvimento modernos

### 📜 **Versões Anteriores**

<details>
<summary><b>Ver histórico completo</b></summary>

**v1.4.0**

- ✅ Padrão Repository implementado
- ✅ Tratamento detalhado de erros
- ✅ Design modular com injeção de dependências
- ✅ Sistema de paginação aprimorado

**v1.3.0**

- ✅ Refatoração de controladores
- ✅ Melhor estruturação de rotas
- ✅ Sistema de logging colorizado

**v1.2.0**

- ✅ Sistema de exclusão de músicas
- ✅ Sincronização de arquivos
- ✅ API administrativa básica

**v1.1.0**

- ✅ Arquitetura em camadas
- ✅ Metadados para músicas
- ✅ Validação expandida

**v1.0.0**

- ✅ MVP com autenticação básica
- ✅ Upload de arquivos
- ✅ Gestão básica de músicas

</details>

---

## 🤝 Contribuição

> **Nota**: Este é um projeto proprietário em desenvolvimento ativo. Contribuições externas não são aceitas no momento.

### 📞 **Contato para Colaboração**

Se você tem interesse em colaborar ou tem sugestões, entre em contato:

- 📧 **Email**: [finotti.dev@gmail.com](mailto:finotti.dev@gmail.com)
- 💼 **LinkedIn**: [Gabriel Finotti](https://www.linkedin.com/in/gabriel-h-finotti-6b4bb029b)
- 🐙 **GitHub**: [@GabrielFinotti](https://github.com/GabrielFinotti)

---

## 📝 Licença

**Proprietária** © 2024 Gabriel Henrique Finotti

> ⚠️ **Todos os direitos reservados**. Este software é propriedade exclusiva de Gabriel Henrique Finotti.
> Uso, cópia, modificação ou distribuição não autorizados são estritamente proibidos.

---

<div align="center">
  
### 🎵 Feito com ❤️ e muito ☕ por Gabriel Henrique Finotti
  
  [![GitHub](https://img.shields.io/badge/GitHub-@GabrielFinotti-181717?style=flat&logo=github)](https://github.com/GabrielFinotti)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Gabriel%20Finotti-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/gabriel-h-finotti-6b4bb029b)
  
  **HyperGenMusic API** • **v2.0.0-dev** • **2024**
  
</div>
