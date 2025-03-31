/**
 * Utilitário para substituição de imagens
 */
import path from "path";
import { deleteFile } from "./deleteFile";

/**
 * Substitui uma imagem existente por uma nova
 * @param oldImageUrl - URL da imagem antiga (opcional)
 * @param newImageFile - Arquivo da nova imagem
 * @param baseUrl - URL base para construção da nova URL
 * @param imageDir - Diretório das imagens
 * @returns Nova URL da imagem
 */
export const replaceImage = async (
  oldImageUrl: string | undefined,
  newImageFile: Express.Multer.File,
  baseUrl: string,
  imageDir: string
): Promise<string> => {
  try {
    // Remove a imagem antiga se existir
    if (oldImageUrl) {
      const oldFileName = oldImageUrl.split("/").pop();

      if (oldFileName) {
        const oldPath = path.resolve(imageDir, oldFileName);
        await deleteFile(oldPath);
      }
    }

    // Gera a nova URL para a imagem
    const newFileName = path.basename(newImageFile.path);
    const newImageUrl = `${baseUrl}/uploads/images/${newFileName}`;

    return newImageUrl;
  } catch (error) {
    throw new Error(`Erro ao substituir imagem: ${error instanceof Error ? error.message : String(error)}`);
  }
};
