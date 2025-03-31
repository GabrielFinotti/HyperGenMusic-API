/**
 * Utilitário para exclusão de arquivos
 */
import fs from "fs/promises";
import { existsSync } from "fs";

/**
 * Exclui um arquivo se ele existir
 * @param filePath - Caminho completo do arquivo
 * @returns Promise que resolve quando a operação for concluída
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    if (existsSync(filePath)) {
      await fs.unlink(filePath);
      console.log(`Arquivo ${filePath} removido com sucesso`.green.bgBlack);
    }
  } catch (error) {
    console.error(
      `Erro ao remover arquivo ${filePath}: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );
  }
};
