# TASKS — API DDD

## Estruturação Inicial

- [ ] Criar estrutura de pastas conforme README.md
- [ ] Configurar TypeScript, Express e ESLint/Prettier
- [ ] Configurar Sequelize (PostgreSQL), Redis e Cloudflare R2
- [ ] Configurar variáveis de ambiente e arquivos de configuração

## Domínios Principais

### User

- [ ] Modelar entidade User
- [ ] Implementar repositório e casos de uso (cadastro, login, perfil)
- [ ] Implementar validações com zod
- [ ] Implementar métricas de usuário

### Auth

- [ ] Implementar autenticação JWT
- [ ] Implementar autenticação Google OAuth
- [ ] Middleware de proteção de rotas

### Music

- [ ] Modelar entidade Music
- [ ] Implementar upload e streaming de músicas (Cloudflare R2)
- [ ] Implementar filtros de música (gênero, artista, etc.)
- [ ] Implementar repositório e casos de uso

### Playlist

- [ ] Modelar entidade Playlist
- [ ] Implementar criação, edição e compartilhamento de playlists
- [ ] Implementar repositório e casos de uso

## Infraestrutura

- [ ] Implementar camada de cache (Redis)
- [ ] Implementar camada de storage (Cloudflare R2)
- [ ] Implementar camada de banco de dados (Sequelize)

## Interfaces

- [ ] Implementar controllers e rotas Express para cada domínio
- [ ] Implementar middlewares globais (auth, error handler)

## Shared

- [ ] Criar helpers, erros customizados e tipos globais

## Testes e Documentação

- [ ] Implementar testes unitários e de integração
- [ ] Documentar API com Swagger/OpenAPI

## Extras

- [ ] Planejar versionamento de API
- [ ] Avaliar monitoramento e métricas de produção
