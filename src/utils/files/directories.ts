/**
 * Utilitários para gerenciamento de diretórios de uploads
 */
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

/**
 * Estrutura de diretórios de upload
 */
interface UploadDirectories {
  rootDir: string;
  uploadDir: string;
  imagesDir: string;
  songsDir: string;
}

/**
 * Configura os diretórios necessários para upload de arquivos
 * @returns Estrutura com os caminhos dos diretórios
 */
export const setupDirectories = async (): Promise<UploadDirectories> => {
  const rootDir = path.resolve(__dirname, "../../../src");
  const uploadDir = path.join(rootDir, "uploads");
  const imagesDir = path.join(uploadDir, "images");
  const songsDir = path.join(uploadDir, "music");

  try {
    // Cria diretório de uploads se não existir
    if (!existsSync(uploadDir)) {
      await fs.mkdir(uploadDir, { recursive: true });
      console.log(`Diretório ${uploadDir} criado com sucesso!`.green.bgBlack);
    }

    // Cria diretório de imagens se não existir
    if (!existsSync(imagesDir)) {
      await fs.mkdir(imagesDir, { recursive: true });
      console.log(`Diretório ${imagesDir} criado com sucesso!`.green.bgBlack);
    }

    // Cria diretório de músicas se não existir
    if (!existsSync(songsDir)) {
      await fs.mkdir(songsDir, { recursive: true });
      console.log(`Diretório ${songsDir} criado com sucesso!`.green.bgBlack);
    }
  } catch (error) {
    console.error(
      `Erro ao criar diretórios: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );
  }

  return { rootDir, uploadDir, imagesDir, songsDir };
};

/**
 * Limpa todos os arquivos dos diretórios de upload
 */
export const cleanDirectories = async (): Promise<void> => {
  const { imagesDir, songsDir } = await setupDirectories();

  /**
   * Remove todos os arquivos de um diretório
   * @param dir Caminho do diretório a ser limpo
   */
  const clearDir = async (dir: string): Promise<void> => {
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
              }`.red.bgBlack
            );
          }
        }
        console.log(`Diretório ${dir} limpo com sucesso!`.green.bgBlack);
      } catch (dirError) {
        console.error(
          `Erro ao ler diretório ${dir}: ${
            dirError instanceof Error ? dirError.message : String(dirError)
          }`.red.bgBlack
        );
      }
    }
  };

  // Limpa os diretórios de upload
  await clearDir(imagesDir);
  await clearDir(songsDir);
};
