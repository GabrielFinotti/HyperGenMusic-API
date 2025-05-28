/**
 * Agregador de Controllers de Usuário Administrativos - HyperMusic API v2.0
 *
 * Centraliza e exporta todos os controllers administrativos para gestão
 * completa de usuários, incluindo operações CRUD e busca avançada.
 *
 * Controllers incluídos:
 * - adminGetAllUsers: Listagem completa com paginação
 * - adminGetUsersTerm: Busca por termo (username, email)
 * - adminCreateUser: Criação via painel administrativo
 * - adminUpdateUser: Atualização de dados de usuário
 * - adminDeleteUsers: Remoção individual com limpeza de tokens
 * - adminDeleteAllUser: Remoção em lote (operação destrutiva)
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import adminGetAllUsers from "./admin_get_all_users";
import adminGetUsersTerm from "./admin_get_users_term";
import adminCreateUser from "./admin_create_user";
import adminUpdateUser from "./admin_update_user";
import adminDeleteUsers from "./admin_delete_user";
import adminDeleteAllUser from "./admin_delete_all_users";

export {
  adminGetAllUsers,
  adminGetUsersTerm,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUsers,
  adminDeleteAllUser,
};
