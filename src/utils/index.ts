// Importações diretas dos módulos
import { jwt, regex, userAuth } from "./auth/index";
import { getUserData, userDataUpdate } from "./user/index";
import { adaptController } from "./expressAdapter";

export const authUtils = {
  jwt,
  regex,
  userAuth,
};

export const userUtils = {
  getUserData,
  userDataUpdate,
};

export { adaptController };
