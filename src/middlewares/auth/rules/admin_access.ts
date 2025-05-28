/**
 * Middleware de Controle de Acesso Administrativo - HyperMusic API v2.0
 *
 * Middleware de autorização que verifica se o usuário autenticado
 * possui privilégios administrativos necessários para acessar
 * endpoints protegidos do painel administrativo.
 *
 * Funcionalidades:
 * - Verificação de roles administrativos (admin, dev)
 * - Validação de existência do usuário no banco
 * - Controle de acesso granular por nível de permissão
 * - Bloqueio de usuários sem privilégios adequados
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { NextFunction, Request, Response } from "express";
import { UserServiceImpl } from "../../../services";
import { responseUtils } from "../../../utils";
import { ResponseSuccess } from "../../../types";
import { User } from "../../../models";

/**
 * Middleware de Controle de Acesso Administrativo
 *
 * Verifica se o usuário autenticado possui privilégios de administrador.
 * Deve ser usado após o middleware de verificação de token.
 *
 * Roles permitidos:
 * - admin: Administrador da plataforma
 * - dev: Desenvolvedor (acesso total)
 *
 * @param req - Request com userId nos parâmetros
 * @param res - Response object
 * @param next - Next middleware function
 *
 * @example
 * ```typescript
 * // Uso em rotas administrativas
 * route.delete("/admin/users", jwt.verifyToken, rules.adminAccess, controller.delete);
 * ```
 */
const adminAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isError = await UserServiceImpl.getProfileData(
      parseInt(req.params.userId)
    );

    if (!isError.success) {
      const err = responseUtils.createErrorResponse("User not found", 404);

      res.status(err.errorCode).send(err);

      return;
    }

    const user = isError as ResponseSuccess<User>;

    if (user.data?.role !== "admin" && user.data?.role !== "dev") {
      const err = responseUtils.createErrorResponse("Unauthorized", 401);

      res.status(err.errorCode).send(err);

      return;
    }

    next();
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default adminAccess;
