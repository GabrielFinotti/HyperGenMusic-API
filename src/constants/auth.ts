/**
 * Constantes relacionadas a autenticação
 */

/**
 * Tempo de expiração para tokens JWT (30 dias)
 */
export const TOKEN_EXPIRATION = "30d";

/**
 * Prefixo usado para tokens armazenados na blacklist do Redis
 */
export const TOKEN_BLACKLIST_PREFIX = "blacklist:";

/**
 * Tipo de autenticação usado nos cabeçalhos
 */
export const AUTH_TYPE = "Bearer";
