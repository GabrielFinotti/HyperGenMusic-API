/**
 * Utilitário de Criação de Tokens JWT - HyperGenMusic API v2.0
 *
 * Fornece geração de tokens JWT para autenticação de usuários
 * com diferentes durações baseadas no tipo de login (temporário ou longo).
 * Utiliza configurações seguras e chaves do ambiente.
 *
 * Funcionalidades:
 * - Geração de tokens JWT com durações configuráveis
 * - Suporte a login temporário e de longa duração
 * - Payload personalizado com dados do usuário
 * - Configuração segura via variáveis de ambiente
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { constants } from "..";

dotenv.config();

/**
 * Utilitário de Criação de Token JWT
 *
 * Gera tokens JWT com diferentes durações baseado no parâmetro isLong.
 * Utiliza chave secreta do ambiente e constantes de tempo configuráveis.
 *
 * @param userId - ID do usuário para incluir no payload
 * @param isLong - Se deve criar token de longa duração
 * @returns Token JWT assinado
 *
 * @example
 * ```typescript
 * // Token padrão (curta duração)
 * const token = createToken(123, false);
 *
 * // Token de longa duração ("lembrar-me")
 * const longToken = createToken(123, true);
 * ```
 */
const createToken = (userId: number, isLong: boolean) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY as string, {
    expiresIn: isLong
      ? constants.authTokenTemp.MAX_TEMP
      : constants.authTokenTemp.MIN_TEMP,
  });
};

export default createToken;
