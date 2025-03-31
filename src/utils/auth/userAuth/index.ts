/**
 * Validadores de dados de usuário
 */
import { validateUserData } from "./dataVerification";
import { validateUpdateData } from "./updateDataVerification";

export const userValidator = {
  userDataVerification: validateUserData,
  updateDataVerification: validateUpdateData, 
};
