/**
 * Agregador Principal de Controllers Administrativos - HyperMusic API v2.0
 *
 * Centraliza e exporta todos os controllers administrativos da aplicação,
 * organizando operações de gestão de usuários e músicas em um ponto único.
 *
 * Módulos incluídos:
 * - Controllers de Usuário: CRUD completo e busca de usuários
 * - Controllers de Música: CRUD completo e gestão do catálogo
 *
 * Todos os controllers requerem privilégios administrativos e são
 * protegidos pelos middlewares de autenticação e autorização.
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import {
  adminGetAllUsers,
  adminGetUsersTerm,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUsers,
  adminDeleteAllUser,
} from "./user";

import {
  adminGetAllMusics,
  adminGetMusicTerm,
  adminCreateMusic,
  adminUpdateMusic,
  adminDeleteMusic,
  adminDeleteAllMusics,
} from "./music";

export {
  adminGetAllUsers,
  adminGetUsersTerm,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUsers,
  adminDeleteAllUser,
  adminGetAllMusics,
  adminGetMusicTerm,
  adminCreateMusic,
  adminUpdateMusic,
  adminDeleteMusic,
  adminDeleteAllMusics,
};
