/**
 * Utilitários para manipulação de dados de usuário
 */
import { fetchUserData } from "./getUserData";
import { updateUserData } from "./userDataUpdate";

export const userService = {
  getUserData: fetchUserData,
  userDataUpdate: updateUserData,
};
