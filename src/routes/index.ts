/**
 * Agregador de Rotas - HyperMusic API v2.0
 *
 * Centraliza e exporta todas as definições de rotas da aplicação,
 * organizando os endpoints por módulo funcional.
 *
 * Rotas incluídas:
 * - userRouter: Rotas de autenticação e gestão de usuários
 * - musicRouter: Rotas públicas do catálogo musical
 * - adminRouter: Rotas administrativas protegidas
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { userRouter } from "./user_router";
import { musicRouter } from "./music_router";
import { adminRouter } from "./admin_router";

export { userRouter, musicRouter, adminRouter };
