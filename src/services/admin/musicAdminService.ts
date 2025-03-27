import Music from "../../models/musicModel";
import { folderUtils } from "../../utils";
import { UploadedFiles, InsertMusicResult } from "../../types";
import path from "path";

export interface MusicAdminService {
  insertMusic(
    title: string,
    duration: string | number,
    files: UploadedFiles,
    artist?: string,
    genre?: string,
    baseUrl?: string
  ): Promise<InsertMusicResult>;
  deleteMusic(id: string): Promise<void>;
  deleteAllMusic(): Promise<void>;
}

class MusicAdminServiceImpl implements MusicAdminService {
  async insertMusic(
    title: string,
    duration: string | number,
    files: UploadedFiles,
    artist?: string,
    genre?: string,
    baseUrl?: string
  ): Promise<InsertMusicResult> {
    let musicFilePath: string | null = null;
    let imageFilePath: string | null = null;

    try {
      if (!title || !duration || !files.music || files.music.length === 0) {
        files.image &&
          (await folderUtils.deleteFileIfExists(files.image[0].path));

        return {
          success: false,
          error:
            "Os campos título, duração e arquivo de música são obrigatórios",
          statusCode: 400,
        };
      }

      const musicFile = files.music[0];
      const imageFile = files.image?.[0];

      musicFilePath = musicFile.path;
      imageFilePath = imageFile ? imageFile.path : null;

      const musicFileName = path.basename(musicFile.path);
      const imageFileName = imageFile ? path.basename(imageFile.path) : null;

      const songUrl = `${baseUrl}/uploads/music/${musicFileName}`;
      const imageUrl = imageFileName
        ? `${baseUrl}/uploads/images/${imageFileName}`
        : undefined;

      const newMusic = await Music.create({
        title: title.trim(),
        songUrl,
        duration: parseInt(duration as string, 10),
        imageUrl,
        artist: artist ?? undefined,
        genre: genre ?? undefined,
      });

      musicFilePath = null;
      imageFilePath = null;

      return {
        success: true,
        music: newMusic.toApiFormat(),
        statusCode: 201,
      };
    } catch (error) {
      console.error(`Erro ao inserir música: ${error}`.red.bgBlack);

      return {
        success: false,
        error: `Falha ao inserir a música no sistema: ${
          error instanceof Error ? error.message : String(error)
        }`,
        statusCode: 500,
      };
    } finally {
      musicFilePath && (await folderUtils.deleteFileIfExists(musicFilePath));
      imageFilePath && (await folderUtils.deleteFileIfExists(imageFilePath));
    }
  }

  async deleteMusic(id: string): Promise<void> {
    try {
      const music = await Music.findByPk(id);

      if (!music) {
        throw new Error("Música não encontrada");
      }

      const musicPath = music.songUrl.split("/uploads/music/")[1];
      const imagePath = music.imageUrl?.split("/uploads/images/")[1];

      await folderUtils.deleteFileIfExists(musicPath);
      imagePath && (await folderUtils.deleteFileIfExists(imagePath));

      await music.destroy();
    } catch (error) {
      throw error;
    }
  }

  async deleteAllMusic(): Promise<void> {}
}

export default new MusicAdminServiceImpl();
