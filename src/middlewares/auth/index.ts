/**
 * Agregador de Middlewares de Autenticação - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todos os middlewares relacionados à
 * autenticação JWT e autorização baseada em roles da aplicação,
 * fornecendo controle de acesso granular aos endpoints.
 *
 * Categorias incluídas:
 * - jwt: Middlewares de autenticação JWT
 * - rules: Middlewares de autorização e controle de acesso
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 *
 * @example
 * ```typescript
 * import { jwt, rules } from "../middlewares";
 *
 * // Rota protegida
 * route.get("/protected", jwt.verifyToken, controller.method);
 *
 * // Rota administrativa
 * route.delete("/admin", jwt.verifyToken, rules.adminAccess, controller.admin);
 * ```
 */
import { verifyToken } from "./jwt";
import { adminAccess } from "./rules";

export const jwt = {
  verifyToken,
};

export const rules = {
  adminAccess,
};
