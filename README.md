<div align="center">
  <img src="https://via.placeholder.com/200x200.png?text=HyperMusic+API" alt="HyperMusic API Logo" width="200" height="200">
  
# 🎵 HyperMusic API v2.0
  
  <p><strong>API de Streaming de Música Enterprise com Arquitetura Moderna</strong></p>
  
  [![Node.js](https://img.shields.io/badge/Node.js-16%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Express](https://img.shields.io/badge/Express-4.21%2B-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Redis](https://img.shields.io/badge/Redis-Latest-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)  [![Versão](https://img.shields.io/badge/Versão-2.0.0-success?style=for-the-badge)](https://github.com/GabrielFinotti/HyperMusic-API)
  [![Status](https://img.shields.io/badge/Status-Release%20Final-brightgreen?style=for-the-badge)](https://github.com/GabrielFinotti/HyperMusic-API)[![Progresso](https://img.shields.io/badge/Progresso-100%25-brightgreen?style=for-the-badge)](TASKS.md)

  > 🎉 **v2.0 Release Final**: Todos os recursos core implementados e estáveis para produção
</div>

---

## 📊 Status do Desenvolvimento v2.0

### 🟢 **Recursos Implementados (100%)**

| Categoria | Feature | Status | Completude |
|-----------|---------|--------|------------|
| 🔐 **Autenticação** | JWT + Blacklist | ✅ | 100% |
| 👤 **Usuários** | CRUD Completo | ✅ | 100% |
| 🎵 **Músicas** | CRUD + Search | ✅ | 100% |
| 👑 **Admin** | Gerenciamento | ✅ | 100% |
| 📋 **Playlists** | Sistema Completo | ✅ | 100% |
| ❤️ **Favoritos** | Sistema de Curtidas | ✅ | 100% |
| 📁 **Upload** | Arquivos + S3 | ✅ | 100% |
| 🛡️ **Segurança** | Validação + Middleware | ✅ | 100% |
| 🏗️ **Arquitetura** | Repository Pattern | ✅ | 100% |

### 🚀 **Próximas Versões**

| Feature | Prioridade | Status | ETA |
|---------|------------|--------|-----|
| 🎧 **Streaming** | Alta | 🔴 Planejado | v2.1 |
| 📊 **Analytics** | Média | 🔴 Planejado | v2.1 |
| 🧪 **Testes** | Baixa | 🔴 Futuro | v2.2+ |

---

## 📖 Índice

- [🚀 Visão Geral](#-visão-geral)
- [✨ Recursos](#-recursos)
- [🏗️ Arquitetura](#️-arquitetura)
- [📋 Requisitos](#-requisitos)
- [⚙️ Instalação](#️-instalação)
- [📚 Documentação da API](#-documentação-da-api)
- [🔧 Tecnologias](#-tecnologias)
- [📈 Changelog](#-changelog)
- [🗺️ Roadmap](#️-roadmap)
- [📝 Licença](#-licença)

---

## 🚀 Visão Geral

O **HyperMusic API v2.0** representa uma evolução completa da plataforma, oferecendo uma solução backend **enterprise-grade** para streaming de música. Esta versão introduz uma arquitetura moderna baseada em **Repository Pattern**, **Service Layer** e **TypeScript** para máxima type safety.

### 🎯 Destaques da v2.0

- 🏗️ **Arquitetura Moderna**: Repository Pattern + Service Layer
- 🔒 **Segurança Enterprise**: JWT + Redis Blacklist + Validação Robusta
- 📊 **Type Safety**: 100% TypeScript com interfaces bem definidas
- 🚀 **Performance**: Otimizada para alta concorrência
- 🔧 **Developer Experience**: APIs padronizadas e documentadas

---

## ✨ Recursos

### 🔐 **Sistema de Autenticação Enterprise**

- ✅ **JWT com Redis Blacklist**: Prevenção de reutilização de tokens
- ✅ **Autenticação Durável**: Tokens de longa duração opcionais
- ✅ **Roles & Permissions**: Sistema de acesso baseado em roles
- ✅ **Password Security**: Hash bcrypt + validação robusta
- ✅ **Token Revocation**: Invalidação automática no logout

### 🎵 **Gerenciamento Completo de Músicas**

- ✅ **Catálogo Rico**: Metadados completos (título, artista, gênero, duração)
- ✅ **Upload Otimizado**: Suporte para múltiplos formatos de áudio
- ✅ **Busca Avançada**: Pesquisa por título, artista ou gênero
- ✅ **Categorização**: Sistema de gêneros musicais
- ✅ **Imagens de Capa**: Upload e gestão de artwork
- ✅ **Paginação Inteligente**: Performance otimizada para grandes catálogos

### 👑 **Painel Administrativo Completo**

- ✅ **Gestão de Usuários**: CRUD completo com busca avançada
- ✅ **Gestão de Músicas**: Criação, edição e exclusão de conteúdo
- ✅ **Upload em Lote**: Operações bulk para eficiência
- ✅ **Controle de Acesso**: Permissões granulares
- ✅ **Operações Seguras**: Validação em todas as operações

### 🏗️ **Arquitetura de Primeira Classe**

- ✅ **Repository Pattern**: Abstração completa da camada de dados
- ✅ **Service Layer**: Lógica de negócio centralizada
- ✅ **Type Safety**: Interfaces TypeScript robustas
- ✅ **Error Handling**: Tratamento centralizado e padronizado
- ✅ **Dependency Injection**: Baixo acoplamento entre componentes

### 📋 **Sistema de Playlists** (✅ Completo v2.0)

- ✅ **CRUD Completo**: Criação, listagem, atualização e exclusão de playlists
- ✅ **Gerenciamento de Músicas**: Adicionar, remover e reordenar músicas
- ✅ **Sistema de Posicionamento**: Ordenação dinâmica das faixas
- ✅ **Validações Robustas**: Verificação de duplicatas e integridade
- ✅ **Relacionamentos**: Associações user-playlist com controle de acesso
- ✅ **Rotas REST**: Endpoints públicos implementados e funcionais

### ❤️ **Sistema de Favoritos** (✅ Completo v2.0)

- ✅ **Curtir/Descurtir**: Sistema completo de likes em músicas
- ✅ **Lista de Favoritos**: Consulta de músicas curtidas por usuário
- ✅ **Prevenção de Duplicatas**: Validação de integridade nas operações
- ✅ **Performance Otimizada**: Consultas eficientes com relacionamentos
- ✅ **Rotas REST**: Endpoints públicos implementados e funcionais

### 📚 **Code Structure**

- ✅ **TypeScript**: Tipagem forte em todos os módulos
- ✅ **Padrão Consistente**: Arquitetura modular padronizada
- ✅ **Funcionalidades Detalhadas**: Implementação completa de recursos
- ✅ **Cobertura Total**: Controllers, Services, Repositories, Models, Utils e Middlewares

---

## 🏗️ Arquitetura

A v2.0 implementa uma **arquitetura em camadas enterprise** com separação clara de responsabilidades:

```
src/
├── 📁 config/              # Configurações centralizadas
│   ├── 📁 archives/        # Configuração Multer/S3
│   └── 📁 database/        # PostgreSQL + Redis
├── 📁 controllers/         # Camada de apresentação HTTP
│   ├── 📁 user/           # Controladores de usuário
│   ├── 📁 music/          # Controladores de música
│   └── 📁 admin/          # Controladores administrativas
├── 📁 services/           # Camada de lógica de negócio
│   ├── 📄 user_service_implement.ts
│   ├── 📄 music_service_implement.ts
│   ├── 📄 admin_service_implements.ts
│   ├── 📄 playlist_service_implement.ts
│   └── 📄 liked_music_service_implement.ts
├── 📁 repositories/       # Camada de acesso a dados
│   ├── 📄 user_repository.ts
│   ├── 📄 music_repository.ts
│   ├── 📄 playlist_repository.ts
│   ├── 📄 playlist_music_repository.ts
│   └── 📄 liked_music_repository.ts
├── 📁 models/             # Modelos Sequelize
│   ├── 📄 User.ts
│   ├── 📄 Music.ts
│   ├── 📄 Playlist.ts
│   ├── 📄 PlaylistMusics.ts
│   └── 📄 LikedMusics.ts
├── 📁 types/              # Definições TypeScript
│   ├── 📁 interfaces/     # Contratos de dados
│   ├── 📁 models/         # Atributos dos modelos
│   ├── 📁 repositories/   # Interfaces dos repositórios
│   └── 📁 services/       # Interfaces dos serviços
├── 📁 middlewares/        # Middlewares customizados
│   └── 📁 auth/          # Autenticação e autorização
├── 📁 routes/             # Definições de rotas
├── 📁 utils/              # Utilitários e helpers
└── 📄 server.ts           # Bootstrap da aplicação
```

### 🏛️ Princípios Implementados

- **🔄 Repository Pattern**: Abstração completa da persistência
- **🎯 Service Layer**: Encapsulamento da lógica de negócio  
- **🔌 Dependency Injection**: Inversão de controle
- **📋 Interface Segregation**: Contratos bem definidos
- **🚨 Centralized Error Handling**: Tratamento uniforme
- **🔍 Single Responsibility**: Uma responsabilidade por classe

---

## 📚 Documentação da API

> **Base URL**: `http://localhost:3000/api/v2`
> **Autenticação**: Bearer Token (JWT)

### 🔐 **Autenticação**

#### Registro de Usuário

```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "11999999999",
  "role": "user"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### 👤 **Usuários**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/profile` | Perfil do usuário logado | ✅ |
| `PUT` | `/profile/update` | Atualizar perfil | ✅ |
| `DELETE` | `/auth/delete` | Excluir conta | ✅ |

### 🎵 **Músicas**

| Método | Endpoint | Descrição | Params |
|--------|----------|-----------|--------|
| `GET` | `/musics` | Listar músicas | `?limit=10&offset=0` |
| `GET` | `/musics/search` | Buscar músicas | `?q=termo&limit=10&offset=0` |
| `GET` | `/musics/genre` | Por gênero | `?genre=rock&limit=10&offset=0` |
| `GET` | `/music/data/{id}` | Detalhes da música | - |

### 👑 **Administração**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/admin/users` | Listar usuários | 👑 Admin |
| `GET` | `/admin/users/search` | Buscar usuários | 👑 Admin |
| `POST` | `/admin/user/create` | Criar usuário | 👑 Admin |
| `PUT` | `/admin/user/update/{id}` | Editar usuário | 👑 Admin |
| `DELETE` | `/admin/user/delete/{id}` | Excluir usuário | 👑 Admin |
| `DELETE` | `/admin/users/deleteAll` | Excluir todos | 👑 Admin |
| `POST` | `/admin/music/create` | Criar música | 👑 Admin |
| `PUT` | `/admin/music/update/{id}` | Editar música | 👑 Admin |
| `DELETE` | `/admin/music/delete/{id}` | Excluir música | 👑 Admin |
| `DELETE` | `/admin/musics/deleteAll` | Excluir todas | 👑 Admin |

### 📋 **Playlists** *(100% Completo - v2.0)*

| Método | Endpoint | Descrição | Auth | Status |
|--------|----------|-----------|------|--------|
| `GET` | `/playlists` | Listar playlists do usuário | ✅ | ✅ Funcionando |
| `POST` | `/playlists/create` | Criar playlist | ✅ | ✅ Funcionando |
| `PUT` | `/playlists/update/{playlistId}` | Atualizar playlist | ✅ | ✅ Funcionando |
| `DELETE` | `/playlists/delete/{playlistId}` | Deletar playlist | ✅ | ✅ Funcionando |
| `GET` | `/playlists/{playlistId}/musics` | Músicas da playlist | ✅ | ✅ Funcionando |
| `POST` | `/playlists/{playlistId}/music/create` | Adicionar música | ✅ | ✅ Funcionando |
| `PUT` | `/playlists/{playlistId}/music/position` | Reordenar músicas | ✅ | ✅ Funcionando |
| `DELETE` | `/playlists/{playlistId}/music/delete` | Remover música | ✅ | ✅ Funcionando |

### ❤️ **Favoritos** *(100% Completo - v2.0)*

| Método | Endpoint | Descrição | Auth | Status |
|--------|----------|-----------|------|--------|
| `GET` | `/favorites` | Listar favoritas do usuário | ✅ | ✅ Funcionando |
| `POST` | `/favorites/create` | Curtir música | ✅ | ✅ Funcionando |
| `DELETE` | `/favorites/delete` | Descurtir música | ✅ | ✅ Funcionando |

### 🔑 **Autenticação**

Todas as rotas protegidas requerem o header:

```http
Authorization: Bearer <your_jwt_token>
```

---

## 🔧 Tecnologias

### 🏗️ **Core Stack**

- ![Node.js](https://img.shields.io/badge/Node.js-16%2B-43853D?style=flat&logo=node.js&logoColor=white) **Node.js 16+** - Runtime JavaScript/TypeScript
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white) **TypeScript 5.7** - Type Safety & Developer Experience
- ![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat&logo=express&logoColor=white) **Express 4.21** - Web Framework Minimalista

### 🗄️ **Database & Cache**

- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?style=flat&logo=postgresql&logoColor=white) **PostgreSQL** - Banco de dados principal
- ![Redis](https://img.shields.io/badge/Redis-Latest-DC382D?style=flat&logo=redis&logoColor=white) **Redis** - Cache e blacklist de tokens
- ![Sequelize](https://img.shields.io/badge/Sequelize-6.37-52B0E7?style=flat&logo=sequelize&logoColor=white) **Sequelize 6.37** - ORM com TypeScript

### 🔐 **Security & Auth**

- ![JWT](https://img.shields.io/badge/JWT-Latest-000000?style=flat&logo=jsonwebtokens&logoColor=white) **JSON Web Tokens** - Autenticação stateless
- **bcrypt 5.1** - Hash seguro de senhas
- **CORS 2.8** - Cross-Origin Resource Sharing

### ☁️ **Cloud & Storage**

- ![AWS](https://img.shields.io/badge/AWS%20S3-FF9900?style=flat&logo=amazon-aws&logoColor=white) **AWS S3** - Storage de arquivos
- **Multer** - Upload de arquivos multipart

### 🛠️ **Development Tools**

- **tsx** - TypeScript execution & hot reload
- **tsup** - Build system otimizado
- **colors** - Logging colorizado

---

## 📈 Changelog

### 🚀 **v2.0.0** (Release Final - 29/05/2025)

#### ✨ **Novos Recursos**

- 🏗️ **Arquitetura Completamente Renovada**: Repository Pattern + Service Layer
- 🔒 **Sistema de Segurança Enterprise**: JWT + Redis Blacklist
- 📊 **100% TypeScript**: Type safety completa com interfaces robustas
- 🎯 **API Padronizada**: Responses unificadas e tratamento de erros centralizado
- 🚀 **Performance Otimizada**: Queries eficientes e paginação inteligente
- 📋 **Sistema de Playlists 100% Completo**: CRUD, rotas REST e gerenciamento de músicas totalmente funcionais
- ❤️ **Sistema de Favoritos 100% Completo**: Controllers, rotas REST, curtir/descurtir e verificação de status totalmente funcionais

#### 🔧 **Melhorias Técnicas**

- ✅ Repository Pattern para abstração de dados
- ✅ Service Layer para lógica de negócio
- ✅ Dependency Injection para baixo acoplamento
- ✅ Error Handling centralizado e padronizado
- ✅ Validation middleware robusto
- ✅ Upload otimizado com suporte S3
- ✅ **PlaylistServiceImpl**: 8 métodos funcionais com validações robustas
- ✅ **LikedMusicServiceImpl**: 4 métodos funcionais com prevenção de duplicatas
- ✅ Sistema de posicionamento dinâmico para playlists
- ✅ Relacionamentos Sequelize otimizados para novos módulos
- ✅ **Rotas REST Completas**: Endpoints de playlists e favoritos totalmente implementados e funcionais
- ✅ **Code Cleanup**: Remoção de JSDoc para código mais limpo e focado

#### 🐛 **Correções**

- ✅ Tratamento de edge cases em autenticação
- ✅ Validação rigorosa de entrada de dados
- ✅ Memory leaks em uploads
- ✅ Race conditions em operações concorrentes

---

## 🗺️ Roadmap

### 🎯 **v2.0 Final (Completo)** ✅

- [x] **Sistema de Playlists Completo**
  - [x] Modelos e repositórios implementados
  - [x] Interfaces de serviço documentadas
  - [x] Implementação completa da lógica de negócio
  - [x] Controllers implementados
  - [x] Rotas REST e endpoints públicos funcionais
  
- [x] **Sistema de Favoritos Completo**
  - [x] Modelos e repositórios implementados  
  - [x] Interfaces de serviço documentadas
  - [x] Implementação completa da lógica de negócio
  - [x] Controllers implementados
  - [x] Rotas REST e endpoints públicos funcionais

> **🎉 Status Final**: A v2.0 está 100% completa com todos os recursos core implementados e funcionais!

### 🚀 **v2.1 (Q3 2025)**

- [ ] **Streaming de Áudio**
  - [ ] Range requests para streaming progressivo
  - [ ] Múltiplos streams simultâneos
  - [ ] Bufferização inteligente
  
- [ ] **Analytics & Monitoring**
  - [ ] Métricas de performance
  - [ ] Logging estruturado
  - [ ] Health checks

### 🔮 **v2.2+ (Futuro)**

- [ ] **Testes Automatizados**
  - [ ] Unit tests para services
  - [ ] Integration tests para APIs
  - [ ] E2E tests críticos
  - [ ] Setup de CI/CD

- [ ] **Machine Learning**
  - [ ] Sistema de recomendações
  - [ ] Análise de preferências
  - [ ] Descoberta musical

- [ ] **Microserviços**
  - [ ] Decomposição em serviços
  - [ ] Containerização Docker
  - [ ] Orquestração Kubernetes

---

## 🤝 Contribuição

> **Nota**: Projeto proprietário em desenvolvimento ativo. Contribuições externas mediante acordo.

### 📞 **Contato**

- 📧 **Email**: [finotti.dev@gmail.com](mailto:finotti.dev@gmail.com)
- 💼 **LinkedIn**: [Gabriel Finotti](https://www.linkedin.com/in/gabriel-h-finotti-6b4bb029b)
- 🐙 **GitHub**: [@GabrielFinotti](https://github.com/GabrielFinotti)

---

## 📝 Licença

**Proprietária** © 2024 Gabriel Henrique Finotti

> ⚠️ **Todos os direitos reservados**. Software proprietário com uso restrito.

---

<div align="center">
  
### 🎵 Crafted with ❤️ and ☕ by Gabriel Henrique Finotti
  
[![GitHub](https://img.shields.io/badge/GitHub-@GabrielFinotti-181717?style=flat&logo=github)](https://github.com/GabrielFinotti)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gabriel%20Finotti-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/gabriel-h-finotti-6b4bb029b)

**HyperMusic API** • **v2.0.0** • **2025**

</div>
