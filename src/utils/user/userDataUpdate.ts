/**
 * Utilitário para atualização de dados de usuário
 */
import { UserInterface } from "../../types";
import User from "../../models/userModel";
import { userService } from "./index";

/**
 * Resultado da operação de atualização
 */
interface UpdateResult {
  message?: string;
  error?: string;
}

/**
 * Atualiza os dados de um usuário
 * @param userDataUpdate - Dados a serem atualizados
 * @param user - Instância do usuário a ser atualizado
 * @returns Resultado da operação
 */
export const updateUserData = async (
  userDataUpdate: Partial<UserInterface>,
  user: User
): Promise<UpdateResult> => {
  try {
    // Verifica se email ou username já existem para outro usuário
    if (userDataUpdate.email || userDataUpdate.username) {
      const existingUser = await userService.getUserData(
        undefined,
        userDataUpdate.email,
        userDataUpdate.username
      );

      if (existingUser && existingUser.id !== user.id) {
        return {
          error: "Usuário com este e-mail ou nome de usuário já existe",
        };
      }
    }

    // Não atualiza a senha se for a mesma
    if (userDataUpdate.password) {
      const hasChangePassword = await user.comparePassword(
        userDataUpdate.password
      );

      if (hasChangePassword) {
        delete userDataUpdate.password;
      }
    }

    // Verifica se há campos para atualizar
    let hasChanges = false;

    (Object.keys(userDataUpdate) as Array<keyof UserInterface>).forEach(
      (key) => {
        const newValue = userDataUpdate[key];
        const currentValue = user.get(key);

        if (newValue !== undefined && newValue !== currentValue) {
          user.set(key, newValue);
          hasChanges = true;
        }
      }
    );

    // Se não houver mudanças, retorna uma mensagem adequada
    if (!hasChanges) {
      return { message: "Tudo está como antes, nada para atualizar" };
    }

    // Salva as alterações
    await user.save();

    return { message: "Dados do usuário atualizados com sucesso" };
  } catch (error) {
    console.error(`Erro em updateUserData: ${
      error instanceof Error ? error.message : String(error)
    }`.red.bgBlack);
    
    return { error: "Falha ao atualizar dados do usuário" };
  }
};
