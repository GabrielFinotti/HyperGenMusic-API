/**
 * Utils centralizados da aplicação
 * 
 * Este módulo exporta utilitários organizados por domínio
 * para facilitar a importação e uso em toda aplicação
 */
import { authService } from "./auth";
import { responseHandler } from "./handlers";
import { fileService } from "./files";
import { userService } from "./user";
import { logger } from "./logger";

export const authUtils = authService;
export const handlingUtils = responseHandler;
export const folderUtils = fileService;
export const userUtils = userService;
export { logger };
