/**
 * Utilitário de Revogação de Tokens JWT - HyperMusic API v2.0
 *
 * Fornece funcionalidade de revogação de tokens JWT através de
 * blacklist armazenada no Redis, garantindo que tokens invalidados
 * não possam ser reutilizados até sua expiração natural.
 *
 * Funcionalidades:
 * - Adição de tokens à blacklist no Redis
 * - Cálculo automático do tempo de expiração
 * - Limpeza automática de tokens expirados
 * - Validação de tokens antes da revogação
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import redisClient from "../../config/database/redis_config";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Utilitário de Revogação de Token JWT
 *
 * Adiciona tokens JWT à blacklist no Redis para prevenir reutilização.
 * Calcula tempo restante de expiração e armazena até esse momento.
 *
 * @param token - Token JWT a ser revogado
 * @throws Error se token for inválido ou expirado
 *
 * @example
 * ```typescript
 * // Revogar token durante logout
 * await revokeToken(userToken);
 * ```
 */
const revokeToken = async (token: string) => {
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY as string);

    if (typeof decode === "string") {
      throw new Error("Invalid token");
    }

    const expirationTime = (decode.exp as number) * 1000;
    const currentTime = Date.now();
    const remainingTime = Math.floor((expirationTime - currentTime) / 1000);

    if (remainingTime > 0) {
      await redisClient.set(
        `Blacklisted:${token}`,
        "revoked",
        "EX",
        remainingTime
      );
    }
  } catch (error) {
    throw error;
  }
};

export default revokeToken;
