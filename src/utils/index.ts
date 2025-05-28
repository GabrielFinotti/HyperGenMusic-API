/**
 * Agregador de Utilitários - HyperMusic API v2.0
 *
 * Centraliza e exporta todos os utilitários da aplicação
 * organizados por categoria funcional.
 *
 * Categorias incluídas:
 * - constants: Constantes de validação e configuração
 * - securityUtils: Funções de segurança e validação
 * - responseUtils: Helpers para padronização de respostas
 * - storageUtils: Utilitários para manipulação de arquivos
 *
 * @example
 * ```typescript
 * import { responseUtils, securityUtils } from "../utils";
 *
 * // Criar resposta de erro padronizada
 * const error = responseUtils.createErrorResponse("Invalid data", 400);
 *
 * // Validar dados de usuário
 * const validation = securityUtils.verifyUserData(userData, false);
 * ```
 */
import { minChar, regex, authTokenTemp } from "./const";
import {
  verifyUserData,
  verifyMusicData,
  comparePassword,
  hashPassword,
  createToken,
  revokeToken,
} from "./security";
import { createErrorResponse, createSuccessResponse } from "./response";
import { deleteArchiveForBucket } from "./storage";

export const constants = {
  minChar,
  regex,
  authTokenTemp,
};

export const securityUtils = {
  verifyUserData,
  verifyMusicData,
  hashPassword,
  comparePassword,
  createToken,
  revokeToken,
};

export const responseUtils = {
  createErrorResponse,
  createSuccessResponse,
};

export const storageUtils = {
  deleteArchiveForBucket,
};
