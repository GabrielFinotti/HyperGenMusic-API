/**
 * Agregador de Controllers de Usuário - HyperMusic API v2.0
 *
 * Centraliza e exporta todos os controllers relacionados às operações
 * de usuário, incluindo autenticação, gestão de perfil e ciclo de vida.
 *
 * Controllers incluídos:
 * - userLogin: Autenticação com JWT e validação de credenciais
 * - userRegister: Registro com validação completa de dados
 * - userDelete: Remoção de conta com revogação de tokens
 * - getProfile: Recuperação de dados do perfil do usuário
 * - userUpdate: Atualização de informações pessoais
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import userLogin from "./user_login";
import userRegister from "./user_register";
import userDelete from "./user_delete";
import getProfile from "./get_profile";
import userUpdate from "./user_update";

export { userLogin, userRegister, userDelete, getProfile, userUpdate };
