import sequelize from "../../config/database/databaseConfig";
import Music from "../../models/musicModel";
import { folderUtils, handlingUtils } from "../../utils";
import { UploadedFiles, DefaultResponseResult } from "../../types";
import path from "path";

interface MusicAdminService {
  insertMusic(
    title: string,
    duration: string | number,
    files: UploadedFiles,
    baseUrl: string,
    artist?: string,
    genre?: string
  ): Promise<DefaultResponseResult>;
  deleteMusic(id: number): Promise<DefaultResponseResult>;
  deleteAllMusics(): Promise<DefaultResponseResult>;
  editMusic(
    musicId: number,
    baseUrl: string,
    title?: string,
    artist?: string,
    genre?: string,
    files?: UploadedFiles
  ): Promise<DefaultResponseResult>;
}

class MusicAdminServiceImpl implements MusicAdminService {
  private imageDir!: string;
  private musicDir!: string;

  constructor() {
    this.setupDirectories();
  }

  private async setupDirectories() {
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
  ) {
    let musicFilePath: string | null = null;
    let imageFilePath: string | null = null;

    try {
      if (!title || !duration || !files.music || files.music.length === 0) {
        files.image &&
          (await folderUtils.deleteFileIfExists(files.image[0].path));

        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Os campos título, duração e arquivo de música são obrigatórios!"
        );
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

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        201,
        "Música inserida com sucesso!",
        newMusic.toApiFormat()
      );
    } catch (error) {
      console.error(
        `Erro ao inserir música: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar inserir a música. Por favor, tente novamente mais tarde!"
      );
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
  ) {
    let imageFilePath: string | null = null;
    let imageUrl: string | undefined;

    const transaction = await sequelize.transaction();

    try {
      const music = await Music.findByPk(musicId);

      if (!music) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Música não encontrada!"
        );
      }

      if (!title && !artist && !genre && !files?.image?.[0]) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Nenhum dado foi fornecido para atualização!"
        );
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

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Música atualizada com sucesso!",
        music.toApiFormat()
      );
    } catch (error) {
      await transaction.rollback();

      console.error(
        `Erro ao editar música: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar editar a música. Por favor, tente novamente mais tarde!"
      );
    } finally {
      imageFilePath && (await folderUtils.deleteFileIfExists(imageFilePath));
    }
  }

  async deleteMusic(musicId: number) {
    try {
      const music = await Music.findByPk(musicId);

      if (!music) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Música não encontrada!"
        );
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

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Música excluída com sucesso!",
        music.toApiFormat()
      );
    } catch (error) {
      console.error(
        `Erro ao excluir música: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar excluir a música. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async deleteAllMusics() {
    try {
      const musics = await Music.findAll();

      if (!this.imageDir || !this.musicDir) {
        await this.setupDirectories();
      }

      if (musics.length === 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Não há músicas para excluir!"
        );
      }

      console.log(
        `Iniciando exclusão de ${musics.length} músicas...`.cyan.bgBlack
      );

      await folderUtils.cleanUploadDirectories();

      await Music.destroy({ where: {} });
      console.log(`Todas as músicas foram excluídas com sucesso`.green.bgBlack);

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        `${musics.length} músicas foram excluídas com sucesso!`
      );
    } catch (error) {
      console.error(
        `Erro ao excluir todas as músicas: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar excluir todas as músicas. Por favor, tente novamente mais tarde!"
      );
    }
  }
}

export default new MusicAdminServiceImpl();
