/**
 * Controller de Atualização Administrativa de Música - HyperMusic API v2.0
 *
 * Gerencia a atualização de metadados de músicas existentes no
 * catálogo através do painel administrativo, permitindo modificação
 * de informações sem afetar os arquivos de mídia.
 *
 * Funcionalidades:
 * - Atualização de metadados por ID específico
 * - Modificação de título, artista e gênero
 * - Validação de dados de entrada
 * - Verificação de existência da música
 * - Preservação de arquivos de mídia existentes
 * - Resposta padronizada de confirmação
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { MusicData, ResponseSuccess } from "../../../types";
import { AdminServiceImpl } from "../../../services";
import { Music } from "../../../models";

/**
 * Controller Administrativo - Atualizar Música
 *
 * Atualiza os metadados de uma música existente no catálogo.
 * Permite modificação de título, artista, gênero e outros dados.
 *
 * @param req.params.musicId - ID da música a ser atualizada
 * @param req.body - Dados parciais da música (MusicData)
 * @returns Música atualizada ou erro de validação
 */
const adminUpdateMusic = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId);
    const musicData = req.body as Partial<MusicData>;    const serviceResponse = await AdminServiceImpl.updateMusic(musicId, musicData);

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<Music>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while updating music",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminUpdateMusic;
