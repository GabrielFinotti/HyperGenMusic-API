/**
 * Utilitário para exclusão de arquivos
 */
import fs from "fs/promises";
import { existsSync } from "fs";
import { logger } from "../logger";

/**
 * Exclui um arquivo se ele existir
 * @param filePath - Caminho completo do arquivo
 * @returns Promise que resolve quando a operação for concluída
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    if (existsSync(filePath)) {
      await fs.unlink(filePath);
      logger.info(`Arquivo ${filePath} removido com sucesso`);
    } else {
      logger.debug(`Arquivo ${filePath} não encontrado para remoção`);
    }
  } catch (error) {
    logger.error(
      `Erro ao remover arquivo ${filePath}`,
      error instanceof Error ? error : new Error(String(error))
    );
    
    // Não propagamos o erro para permitir que o programa continue
    // mesmo se a exclusão do arquivo falhar
  }
};
