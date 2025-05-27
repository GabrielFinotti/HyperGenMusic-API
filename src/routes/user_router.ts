/**
 * Router de Usuários - HyperGenMusic API v2.0
 *
 * Gerencia todas as operações relacionadas aos usuários:
 * - Autenticação (login/register/logout)
 * - Perfil do usuário (visualização e atualização)
 * - Upload de imagem de perfil
 *
 * Endpoints públicos: /auth/login, /auth/register
 * Endpoints protegidos: Requerem JWT válido
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Router } from "express";
import { userController } from "../controllers";
import { jwt } from "../middlewares";
import multer from "../config/archives/multer_config";

const route = Router();

/**
 * POST /auth/login
 * Autenticação de usuário
 * @body {email: string, password: string, isLong?: boolean}
 */
route.post("/auth/login", userController.userLogin);

/**
 * POST /auth/register
 * Registro de novo usuário
 * @body UserData - Dados completos do usuário
 */
route.post("/auth/register", userController.userRegister);

/**
 * DELETE /auth/delete
 * Remove conta do usuário autenticado
 * @header Authorization - Bearer token
 */
route.delete("/auth/delete", jwt.verifyToken, userController.userDelete);

/**
 * GET /profile
 * Obtém dados do perfil do usuário autenticado
 * @header Authorization - Bearer token
 */
route.get("/profile", jwt.verifyToken, userController.getProfile);

/**
 * PUT /profile/update
 * Atualiza dados do perfil do usuário
 * @header Authorization - Bearer token
 * @files image - Nova imagem de perfil (opcional)
 * @body Partial<UserData> - Dados a serem atualizados
 */
route.put(
  "/profile/update",
  jwt.verifyToken,
  multer.single("image"),
  userController.userUpdate
);

export const userRouter = route;
