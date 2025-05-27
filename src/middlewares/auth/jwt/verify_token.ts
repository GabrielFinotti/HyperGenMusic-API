/**
 * Middleware de Verificação de Tokens JWT - HyperGenMusic API v2.0
 *
 * Middleware de autenticação que valida tokens JWT em requisições protegidas,
 * verificando assinatura, expiração e status de revogação através de
 * blacklist mantida no Redis.
 *
 * Funcionalidades:
 * - Extração de token do header Authorization
 * - Verificação de blacklist no Redis
 * - Validação de assinatura e expiração
 * - Injeção de userId nos parâmetros da requisição
 * - Tratamento de erros de autenticação
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { NextFunction, Request, Response } from "express";
import redisClient from "../../../config/database/redis_config";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { responseUtils } from "../../../utils";

dotenv.config();

/**
 * Middleware de Verificação de Token JWT
 *
 * Middleware responsável por:
 * - Extrair token JWT do header Authorization
 * - Verificar se o token está na blacklist (Redis)
 * - Validar assinatura e expiração do token
 * - Adicionar userId aos parâmetros da requisição
 *
 * @param req - Request com header Authorization
 * @param res - Response object
 * @param next - Next middleware function
 *
 * @example
 * ```typescript
 * // Uso em rotas protegidas
 * route.get("/protected", jwt.verifyToken, controller.method);
 * ```
 */
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      const err = responseUtils.createErrorResponse("Token not provided", 401);

      res.status(err.errorCode).send(err);

      return;
    }

    const isRevoked = await redisClient.get(`Blacklisted:${token}`);

    if (isRevoked) {
      const err = responseUtils.createErrorResponse("Token revoked", 401);

      res.status(err.errorCode).send(err);
      
      return;
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY as string);

    if (typeof decode === "string") {
      const err = responseUtils.createErrorResponse("Invalid token", 401);

      res.status(err.errorCode).send(err);

      return;
    }

    req.params.userId = decode.userId as string;

    next();
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default verifyToken;
