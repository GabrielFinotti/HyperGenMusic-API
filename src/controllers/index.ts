/**
 * Agregador Principal de Controllers - HyperMusic API v2.0
 *
 * Centraliza e organiza todos os controllers da aplicação em objetos
 * categorizados por funcionalidade, fornecendo um ponto único de acesso
 * para todas as operações da API.
 *
 * Categorias disponíveis:
 * - userController: Operações de usuário (auth, perfil, CRUD)
 * - musicController: Operações públicas de música (consulta, busca)
 * - adminController: Operações administrativas (gestão completa)
 *
 * Estrutura organizada para facilitar importação e uso pelos roteadores
 * e manter separação clara de responsabilidades por domínio.
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import {
  userLogin,
  userRegister,
  userDelete,
  getProfile,
  userUpdate,
} from "./user";
import {
  getMusicData,
  getAllMusic,
  getMusicGenre,
  getMusicTerm,
} from "./music";
import {
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
} from "./admin";
import {
  getLikedMusicUser,
  checkIfUserLikedMusic,
  likeMusic,
  unlikeMusic,
} from "./likedMusic";

export const userController = {
  userLogin,
  userRegister,
  userDelete,
  getProfile,
  userUpdate,
};

export const musicController = {
  getMusicData,
  getAllMusic,
  getMusicGenre,
  getMusicTerm,
};

export const adminController = {
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

export const LikedMusicController = {
  getLikedMusicUser,
  checkIfUserLikedMusic,
  likeMusic,
  unlikeMusic,
};
