import path from "path";
import deleteFileIfExists from "./deleteFileIfExists";

const replaceImage = async (
  oldImageUrl: string | undefined,
  newImageFile: Express.Multer.File,
  baseUrl: string,
  imageDir: string
) => {
  try {
    if (oldImageUrl) {
      const oldFileName = oldImageUrl.split("/").pop();

      if (oldFileName) {
        const oldPath = path.resolve(imageDir, oldFileName);
        await deleteFileIfExists(oldPath);
      }
    }

    const newFileName = path.basename(newImageFile.path);
    const newImageUrl = `${baseUrl}/uploads/images/${newFileName}`;

    return newImageUrl;
  } catch (error) {
    throw new Error(`Erro inesperado ao substituir imagem: ${error}`);
  }
};

export default replaceImage;
