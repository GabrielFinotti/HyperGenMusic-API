import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const setupUploadDirectories = async () => {
  const rootDir = path.resolve(__dirname, "../../../src");
  const uploadDir = path.join(rootDir, "uploads");
  const imagesDir = path.join(uploadDir, "images");
  const songsDir = path.join(uploadDir, "music");

  try {
    if (!existsSync(uploadDir)) {
      await fs.mkdir(uploadDir, { recursive: true });
      console.log(`Diretorio ${uploadDir} criado com sucesso!`);
    }

    if (!existsSync(imagesDir)) {
      await fs.mkdir(imagesDir, { recursive: true });
      console.log(`Diretorio ${imagesDir} criado com sucesso!`);
    }

    if (!existsSync(songsDir)) {
      await fs.mkdir(songsDir, { recursive: true });
      console.log(`Diretorio ${songsDir} criado com sucesso!`);
    }
  } catch (error) {
    console.error(
      `Erro ao criar diretórios: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

  return { rootDir, uploadDir, imagesDir, songsDir };
};

export const cleanUploadDirectories = async () => {
  const { imagesDir, songsDir } = await setupUploadDirectories();

  const clearDir = async (dir: string) => {
    if (existsSync(dir)) {
      try {
        const files = await fs.readdir(dir);
        for (const file of files) {
          try {
            await fs.unlink(path.join(dir, file));
          } catch (fileError) {
            console.error(
              `Erro ao remover arquivo ${file}: ${
                fileError instanceof Error
                  ? fileError.message
                  : String(fileError)
              }`
            );
          }
        }
        console.log(`Diretorio ${dir} limpo com sucesso!`);
      } catch (dirError) {
        console.error(
          `Erro ao ler diretório ${dir}: ${
            dirError instanceof Error ? dirError.message : String(dirError)
          }`
        );
      }
    }
  };

  await clearDir(imagesDir);
  await clearDir(songsDir);
};

export default setupUploadDirectories;
