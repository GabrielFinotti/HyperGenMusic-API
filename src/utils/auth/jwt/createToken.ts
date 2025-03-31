/**
 * Utilitário para geração de tokens JWT
 */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TOKEN_EXPIRATION } from "../../../constants/auth";

dotenv.config();

/**
 * Gera um token JWT para o usuário
 * @param userId - ID do usuário para o qual o token será gerado
 * @returns Token JWT ou objeto de erro
 */
export const generateToken = async (userId: number): Promise<string | { error: string }> => {
  try {
    const payload = { userId };
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      throw new Error("Chave secreta não configurada");
    }

    return jwt.sign(payload, secret, {
      expiresIn: TOKEN_EXPIRATION,
    });
  } catch (error) {
    console.error(`Falha ao gerar token de login! Erro: ${error}`.red.bgBlack);

    return { error: "Falha ao gerar token de login!" };
  }
};
