import { UserInterface } from "../../interfaces/userInterface";
import User from "../../models/userModel";
import { userUtils } from "..";

export const userDataUpdate = async (
  userDataUpdate: Partial<UserInterface>,
  user: User
) => {
  try {
    if (userDataUpdate.email || userDataUpdate.username) {
      const existingUser = await userUtils.getUserData(
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

    if (userDataUpdate.password) {
      const hasChangePassword = await user.comparePassword(
        userDataUpdate.password
      );

      if (hasChangePassword) {
        delete userDataUpdate.password;
      }
    }

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

    if (!hasChanges) {
      return { message: "Tudo está como antes, nada para atualizar" };
    }

    await user.save();

    return { message: "Dados do usuário atualizados com sucesso" };
  } catch (error) {
    console.error(`Erro em userDataUpdate:`, error);
    return { error: "Falha ao atualizar dados do usuário" };
  }
};
