/**
 * Agregador de Middlewares JWT - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todos os middlewares relacionados à
 * autenticação JWT da aplicação.
 *
 * Middlewares incluídos:
 * - verifyToken: Middleware para validação de tokens JWT
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import verifyToken from "./verify_token";

export { verifyToken };
