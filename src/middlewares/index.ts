/**
 * Agregador Principal de Middlewares - HyperMusic API v2.0
 *
 * Centraliza e exporta todos os middlewares da aplicação
 * organizados por categoria funcional.
 *
 * Categorias incluídas:
 * - jwt: Middlewares de autenticação JWT
 * - rules: Middlewares de autorização e controle de acesso
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { jwt } from "./auth";
import { rules } from "./auth";

export { jwt, rules };
