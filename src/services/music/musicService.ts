import Music from "../../models/musicModel";

export interface MusicService {
  getAllMusic(): Promise<Music[]>;
  getMusicById(id: number): Promise<Music | null>;
}

class MusicServiceImpl implements MusicService {
  async getAllMusic(): Promise<Music[]> {
    try {
      return await Music.findAll();
    } catch (error) {
      console.error(`Erro ao buscar músicas: ${error}`.red.bgBlack);

      throw new Error("Falha ao recuperar músicas");
    }
  }

  async getMusicById(id: number): Promise<Music | null> {
    try {
      if (isNaN(id)) {
        throw new Error("ID de música inválido");
      }

      return await Music.findByPk(id);
    } catch (error) {
      console.error(`Erro ao buscar música por ID: ${error}`.red.bgBlack);
      
      throw error;
    }
  }
}

export default new MusicServiceImpl();
