/**
 * Utilitário para busca de dados de usuário
 */
import { Op } from "sequelize";
import User from "../../models/userModel";

/**
 * Busca informações de um usuário por ID, email ou nome de usuário
 * @param userId - ID do usuário (opcional)
 * @param email - Email do usuário (opcional)
 * @param username - Nome de usuário (opcional)
 * @returns Instância do usuário encontrado ou null
 */
export const fetchUserData = async (
  userId?: number,
  email?: string,
  username?: string
): Promise<User | null> => {
  try {
    // Busca por ID
    if (userId && !email && !username) {
      return await User.findOne({
        where: { id: userId },
      });
    } 
    // Busca por email
    else if (!userId && email && !username) {
      return await User.findOne({
        where: { email },
      });
    } 
    // Busca por nome de usuário
    else if (!userId && !email && username) {
      return await User.findOne({
        where: { username },
      });
    } 
    // Busca por email ou nome de usuário
    else if (!userId && email && username) {
      return await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });
    } 
    // Nenhum parâmetro válido fornecido
    else {
      return null;
    }
  } catch (error) {
    console.error(`Erro ao obter dados do usuário: ${
      error instanceof Error ? error.message : String(error)
    }`.red.bgBlack);

    throw new Error("Falha ao obter usuário");
  }
};
