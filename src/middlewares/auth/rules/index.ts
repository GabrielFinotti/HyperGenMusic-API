/**
 * Agregador de Middlewares de Autorização - HyperMusic API v2.0
 *
 * Centraliza e exporta todos os middlewares de controle de acesso
 * e autorização da aplicação.
 *
 * Middlewares incluídos:
 * - adminAccess: Middleware para validação de privilégios administrativos
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import adminAccess from "./admin_access";

export { adminAccess };
