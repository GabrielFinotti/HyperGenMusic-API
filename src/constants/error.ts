/**
 * Constantes relacionadas a erros e mensagens de erro
 */

/**
 * Códigos de erro da aplicação
 */
export const ERROR_CODES = {
  // Erros gerais
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  
  // Erros de autenticação
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_TOKEN_REVOKED: 'AUTH_TOKEN_REVOKED',
  AUTH_FORBIDDEN: 'AUTH_FORBIDDEN',
  
  // Erros de recursos
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  
  // Erros de arquivos
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
  FILE_DELETE_ERROR: 'FILE_DELETE_ERROR',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
};

/**
 * Mensagens genéricas de erro
 */
export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'O servidor encontrou um erro inesperado. Por favor, tente novamente mais tarde.',
  RESOURCE_NOT_FOUND: 'O recurso solicitado não foi encontrado.',
  UNAUTHORIZED: 'Você não está autorizado a acessar este recurso.',
  FORBIDDEN: 'Você não tem permissão para realizar esta operação.',
  VALIDATION_FAILED: 'Os dados fornecidos são inválidos.',
  
  // Erros de arquivo
  FILE_TOO_LARGE: 'O arquivo enviado excede o limite de tamanho permitido.',
  INVALID_FILE_TYPE: 'O tipo de arquivo não é suportado.',
};
