/**
 * Controller de Criação Administrativa de Música - HyperMusic API v2.0
 *
 * Gerencia a criação de novas músicas no catálogo através do painel
 * administrativo, incluindo processamento de uploads de arquivos de
 * áudio e imagens de capa com validação completa.
 *
 * Funcionalidades:
 * - Criação de música com metadados completos
 * - Upload obrigatório de arquivo de áudio
 * - Upload opcional de imagem de capa
 * - Validação de tipos de arquivo
 * - Integração com AWS S3/Cloudflare R2
 * - Resposta padronizada de sucesso/erro
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { MusicData, ResponseSuccess } from "../../../types";

/**
 * Controller Administrativo - Criação de Música
 *
 * Cria nova música no catálogo com upload de arquivos.
 * Processa arquivo de áudio (obrigatório) e imagem de capa (opcional).
 *
 * @param req.body - Metadados da música (MusicData)
 * @param req.files - Arquivos: music (áudio) e image (capa)
 * @returns Confirmação de criação ou erro de validação
 */
const adminCreateMusic = async (req: Request, res: Response) => {
  try {
    const musicData = req.body as MusicData;

    const files = req.files as Express.MulterS3.File[];

    if (files.length === 0) {
      const err = responseUtils.createErrorResponse(
        "No files were uploaded",
        400
      );
      res.status(err.errorCode).send(err);

      return;
    }

    musicData.songUrl = files[0].location;

    if (files[1]) {
      musicData.imageUrl = files[1].location;
    }

    const isError = await AdminServiceImpl.createMusic(musicData);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while creating music",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminCreateMusic;
