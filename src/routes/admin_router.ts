/**
 * Router de Administração - HyperGenMusic API v2.0
 *
 * Centraliza todas as rotas administrativas da API, incluindo:
 * - Gestão completa de usuários (CRUD + busca)
 * - Gestão completa de músicas (CRUD + upload)
 * - Operações em lote (delete all)
 *
 * Todas as rotas requerem:
 * - Autenticação JWT válida (jwt.verifyToken)
 * - Privilégios de administrador (rules.adminAccess)
 *
 * @security Admin/Dev role required
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Router } from "express";
import { jwt, rules } from "../middlewares";
import { adminController } from "../controllers";
import multer_config from "../config/archives/multer_config";

const route = Router();

// ===== GESTÃO DE USUÁRIOS =====

/**
 * GET /admin/users
 * Lista todos os usuários com paginação
 * @query limit - Limite de resultados por página (padrão: 10)
 * @query offset - Número de registros a pular (padrão: 0)
 */
route.get(
  "/admin/users",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminGetAllUsers
);

/**
 * GET /admin/users/search
 * Busca usuários por termo (username ou email)
 * @query term - Termo de busca
 * @query limit - Limite de resultados
 * @query offset - Paginação
 */
route.get(
  "/admin/users/search",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminGetUsersTerm
);

/**
 * POST /admin/user/create
 * Cria um novo usuário através do painel admin
 * @body UserData - Dados completos do usuário
 */
route.post(
  "/admin/user/create",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminCreateUser
);

/**
 * PUT /admin/user/update/:id
 * Atualiza dados de um usuário específico
 * @param id - ID do usuário a ser atualizado
 * @body Partial<UserData> - Dados parciais para atualização
 */
route.put(
  "/admin/user/update/:id",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminUpdateUser
);

/**
 * DELETE /admin/user/delete/:id
 * Remove um usuário específico do sistema
 * @param id - ID do usuário a ser removido
 */
route.delete(
  "/admin/user/delete/:id",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminDeleteUsers
);

/**
 * DELETE /admin/users/deleteAll
 * Remove todos os usuários do sistema
 * ⚠️ OPERAÇÃO DESTRUTIVA - Use com extrema cautela
 */
route.delete(
  "/admin/users/deleteAll",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminDeleteAllUser
);

// ===== GESTÃO DE MÚSICAS =====

/**
 * GET /admin/musics
 * Lista todas as músicas com paginação
 */
route.get(
  "/admin/musics",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminGetAllMusics
);

/**
 * GET /admin/musics/search
 * Busca músicas por termo (título, artista, gênero)
 */
route.get(
  "/admin/musics/search",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminGetMusicTerm
);

/**
 * POST /admin/music/create
 * Cria uma nova música no catálogo
 * @files music - Arquivo de áudio (obrigatório)
 * @files image - Imagem de capa (opcional)
 * @body MusicData - Metadados da música
 */
route.post(
  "/admin/music/create",
  jwt.verifyToken,
  rules.adminAccess,
  multer_config.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  adminController.adminCreateMusic
);

/**
 * PUT /admin/music/update/:musicId
 * Atualiza uma música existente
 * @param musicId - ID da música a ser atualizada
 * @files music - Novo arquivo de áudio (opcional)
 * @files image - Nova imagem de capa (opcional)
 * @body Partial<MusicData> - Metadados a serem atualizados
 */
route.put(
  "/admin/music/update/:musicId",
  jwt.verifyToken,
  rules.adminAccess,
  multer_config.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  adminController.adminUpdateMusic
);

/**
 * DELETE /admin/music/delete/:musicId
 * Remove uma música específica do catálogo
 * @param musicId - ID da música a ser removida
 */
route.delete(
  "/admin/music/delete/:musicId",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminDeleteMusic
);

/**
 * DELETE /admin/musics/deleteAll
 * Remove todas as músicas do catálogo
 * ⚠️ OPERAÇÃO DESTRUTIVA - Use com extrema cautela
 */
route.delete(
  "/admin/musics/deleteAll",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminDeleteAllMusics
);

export const adminRouter = route;
