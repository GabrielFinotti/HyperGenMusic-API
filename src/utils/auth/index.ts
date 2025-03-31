/**
 * Serviços de autenticação e autorização
 */
import { tokenService } from "./jwt";
import { validationPatterns } from "./regex";
import { userValidator } from "./userAuth";

export const authService = {
  jwt: tokenService,
  regex: validationPatterns,
  userAuth: userValidator,
};
