/**
 * Constantes relacionadas a arquivos e uploads
 */

/**
 * Caminho relativo para o diretório de uploads
 */
export const UPLOAD_DIR = "uploads";

/**
 * Caminho relativo para o diretório de imagens
 */
export const IMAGES_DIR = "uploads/images";

/**
 * Caminho relativo para o diretório de músicas
 */
export const MUSIC_DIR = "uploads/music";

/**
 * Limite de tamanho para uploads de imagens (20MB)
 */
export const IMAGE_SIZE_LIMIT = 20 * 1024 * 1024;

/**
 * Limite de tamanho para uploads de músicas (400MB)
 */
export const MUSIC_SIZE_LIMIT = 400 * 1024 * 1024;

/**
 * Extensão padrão para arquivos temporários
 */
export const DEFAULT_TEMP_EXT = ".tmp";

/**
 * Mensagens relacionadas a arquivos
 */
export const FILE_MESSAGES = {
  FILE_TOO_LARGE: "Arquivo muito grande",
  INVALID_FILE_TYPE: "Tipo de arquivo não suportado",
  FILE_DELETED: "Arquivo removido com sucesso",
  ERROR_DELETING_FILE: "Erro ao remover arquivo",
};
