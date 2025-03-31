/**
 * Utilitário para manipulação de tipos e extensões de arquivos
 */

/**
 * Mapeamento de tipos MIME para extensões de arquivo
 */
export const fileTypes = {
  image: {
    "image/png": ".png",
    "image/jpeg": ".jpg",
  },
  music: {
    "audio/mpeg": ".mp3",
    "audio/wav": ".wav",
    "audio/ogg": ".ogg",
  },
};

/**
 * Obtém a extensão de arquivo com base no tipo MIME
 * @param mimetype - Tipo MIME do arquivo
 * @returns Extensão do arquivo incluindo o ponto (.)
 */
export function getFileExtension(mimetype: string): string {
  // Verifica se é um tipo de imagem
  if (Object.keys(fileTypes.image).includes(mimetype)) {
    return fileTypes.image[mimetype as keyof typeof fileTypes.image];
  }
  
  // Verifica se é um tipo de música
  if (Object.keys(fileTypes.music).includes(mimetype)) {
    return fileTypes.music[mimetype as keyof typeof fileTypes.music];
  }
  
  // Se não for reconhecido, retorna extensão temporária
  return ".tmp";
}
