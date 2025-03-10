// Importações diretas dos submódulos
import { generateToken, deleteToken } from "./jwt/index";
import { regexGroup } from "./regex/index";
import { userDataVerification, updateDataVerification } from "./userAuth/index";

// Exportação organizada por submódulo
export const jwt = {
  generateToken,
  deleteToken,
};

export const regex = {
  regexGroup,
};

export const userAuth = {
  userDataVerification,
  updateDataVerification,
};
