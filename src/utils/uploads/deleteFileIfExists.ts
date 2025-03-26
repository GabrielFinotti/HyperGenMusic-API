import fs from "fs/promises";
import { existsSync } from "fs";

const deleteFileIfExists = async (filePath: string) => {
  try {
    if (existsSync(filePath)) {
      await fs.unlink(filePath);
      console.log(`Arquivo ${filePath} removido com sucesso`);
    }
  } catch (error) {
    console.log(
      `Erro ao remover arquivo ${filePath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export default deleteFileIfExists;
