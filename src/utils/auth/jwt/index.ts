/**
 * Serviços relacionados a tokens JWT
 */
import { generateToken } from "./createToken";
import { deleteToken } from "./deleteToken";

export const tokenService = {
  generateToken,
  deleteToken,
};
