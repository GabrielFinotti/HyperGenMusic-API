import sequelize from "../../config/database/databaseConfig";
import Music from "../../models/musicModel";
import { folderUtils } from "../../utils";
import {
  UploadedFiles,
  InsertMusicResult,
  UpdateMusicResult,
} from "../../types";
import path from "path";

interface MusicAdminService {
  insertMusic(
    title: string,
    duration: string | number,
    files: UploadedFiles,
    baseUrl: string,
    artist?: string,
    genre?: string
  ): Promise<InsertMusicResult>;
  deleteMusic(id: number): Promise<void>;
  deleteAllMusics(): Promise<void>;
  editMusic(
    musicId: number,
    baseUrl: string,
    title?: string,
    artist?: string,
    genre?: string,
    files?: UploadedFiles
  ): Promise<UpdateMusicResult>;
}

class MusicAdminServiceImpl implements MusicAdminService {
  private imageDir!: string;
  private musicDir!: string;

  constructor() {
    this.setupDirectories();
  }

  private async setupDirectories(): Promise<void> {
    try {
      const { imagesDir, songsDir } =
        await folderUtils.setupUploadDirectories();

      this.imageDir = imagesDir;
      this.musicDir = songsDir;
      console.log(
        "Diretórios de música configurados com sucesso".green.bgBlack
      );
    } catch (error) {
      console.error(
        `Erro ao configurar diretórios: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );
    }
  }

  async insertMusic(
    title: string,
    duration: string | number,
    files: UploadedFiles,
    baseUrl: string,
    artist?: string,
    genre?: string
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

  async editMusic(
    musicId: number,
    baseUrl: string,
    title?: string,
    artist?: string,
    genre?: string,
    files?: UploadedFiles
  ): Promise<UpdateMusicResult> {
    let imageFilePath: string | null = null;
    let imageUrl: string | undefined;

    const transaction = await sequelize.transaction();

    try {
      const music = await Music.findByPk(musicId);

      if (!music) {
        throw new Error("Música não encontrada");
      }

      if (!title && !artist && !genre && !files?.image?.[0]) {
        return {
          success: false,
          error: "Nenhum dado foi fornecido para atualização",
          statusCode: 400,
        };
      }

      const imageFile = files?.image?.[0];

      if (imageFile && music.imageUrl) {
        imageUrl = await folderUtils.replaceImage(
          music.imageUrl,
          imageFile,
          baseUrl,
          this.imageDir
        );
      }

      await music.update(
        {
          title: title?.trim() ?? music.title,
          artist: artist?.trim() ?? music.artist,
          genre: genre?.trim() ?? music.genre,
          imageUrl: imageUrl ?? music.imageUrl,
        },
        { transaction }
      );

      imageFilePath = null;

      await transaction.commit();

      return {
        success: true,
        music: music.toApiFormat(),
        statusCode: 200,
      };
    } catch (error) {
      await transaction.rollback();
      console.error(`Erro ao editar música: ${error}`.red.bgBlack);

      return {
        success: false,
        error: `Falha ao editar a música no sistema: ${
          error instanceof Error ? error.message : String(error)
        }`,
        statusCode: 500,
      };
    } finally {
      imageFilePath && (await folderUtils.deleteFileIfExists(imageFilePath));
    }
  }

  async deleteMusic(musicId: number): Promise<void> {
    try {
      const music = await Music.findByPk(musicId);

      if (!music) {
        throw new Error("Música não encontrada");
      }

      if (!this.imageDir || !this.musicDir) {
        await this.setupDirectories();
      }

      const musicFileName = music.songUrl.split("/").pop() as string;
      const imageFileName = music.imageUrl?.split("/").pop();

      const musicFilePath = path.resolve(this.musicDir, musicFileName);

      await folderUtils.deleteFileIfExists(musicFilePath);
      console.log(
        `Arquivo de música excluído: ${musicFileName}`.yellow.bgBlack
      );

      if (imageFileName) {
        const imageFilePath = path.resolve(this.imageDir, imageFileName);

        await folderUtils.deleteFileIfExists(imageFilePath);
        console.log(
          `Arquivo de imagem excluído: ${imageFileName}`.yellow.bgBlack
        );
      }

      await music.destroy();
      console.log(
        `Música ID: ${musicId} excluída do banco de dados`.green.bgBlack
      );
    } catch (error) {
      console.error(
        `Erro ao excluir música: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      throw error;
    }
  }

  async deleteAllMusics(): Promise<void> {
    try {
      const musics = await Music.findAll();

      if (!this.imageDir || !this.musicDir) {
        await this.setupDirectories();
      }

      if (musics.length === 0) {
        console.log("Não há músicas para excluir".yellow.bgBlack);
        return;
      }

      console.log(
        `Iniciando exclusão de ${musics.length} músicas...`.cyan.bgBlack
      );

      await folderUtils.cleanUploadDirectories();

      await Music.destroy({ where: {} });
      console.log(`Todas as músicas foram excluídas com sucesso`.green.bgBlack);
    } catch (error) {
      console.error(
        `Erro ao excluir todas as músicas: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      throw error;
    }
  }
}

export default new MusicAdminServiceImpl();
