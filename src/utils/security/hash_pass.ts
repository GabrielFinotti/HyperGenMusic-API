/**
 * Utilitário de Hash de Senhas - HyperMusic API v2.0
 *
 * Fornece funcionalidades de criptografia e verificação de senhas
 * utilizando bcrypt com salt rounds configuráveis para máxima
 * segurança na autenticação de usuários.
 *
 * Funcionalidades:
 * - Hash seguro de senhas com bcrypt
 * - Comparação de senhas com hashes armazenados
 * - Salt rounds configuráveis (padrão: 12)
 * - Tratamento de erros de criptografia
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 *
 * @example
 * ```typescript
 * // Hash de senha durante registro
 * const hashed = await hashPassword("userPassword123");
 *
 * // Verificação durante login
 * const isValid = await comparePassword("userPassword123", hashed);
 * ```
 */
import bcrypt from "bcrypt";

/**
 * Gera hash seguro da senha usando bcrypt
 * @param password - Senha em texto plano
 * @returns Hash da senha com salt rounds = 10
 */
const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

/**
 * Compara senha em texto plano com hash armazenado
 * @param password - Senha em texto plano
 * @param hashedPassword - Hash armazenado no banco
 * @returns true se a senha corresponder ao hash
 */
export const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  } catch (error) {
    throw error;
  }
};

export default hashPassword;
