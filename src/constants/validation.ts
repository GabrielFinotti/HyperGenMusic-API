/**
 * Constantes para validação de dados
 */

/**
 * Comprimento mínimo para senhas
 */
export const PASSWORD_MIN_LENGTH = 8;

/**
 * Comprimento máximo para senhas
 */
export const PASSWORD_MAX_LENGTH = 20;

/**
 * Comprimento mínimo para nomes de usuário
 */
export const USERNAME_MIN_LENGTH = 6;

/**
 * Comprimento máximo para nomes de usuário
 */
export const USERNAME_MAX_LENGTH = 12;

/**
 * Mensagens de validação comuns
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "Campo obrigatório",
  INVALID_EMAIL: "Formato de e-mail inválido",
  PASSWORD_TOO_SHORT: `Senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`,
  PASSWORD_TOO_LONG: `Senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres`,
  USERNAME_TOO_SHORT: `Nome de usuário deve ter no mínimo ${USERNAME_MIN_LENGTH} caracteres`,
  USERNAME_TOO_LONG: `Nome de usuário deve ter no máximo ${USERNAME_MAX_LENGTH} caracteres`,
  WHITESPACE_NOT_ALLOWED: "Não pode começar ou terminar com espaço em branco",
};
