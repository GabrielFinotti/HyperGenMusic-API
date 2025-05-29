/**
 * Controller de Remoção Individual de Música - HyperMusic API v2.0
 *
 * Gerencia a remoção de músicas específicas do catálogo através do
 * painel administrativo, incluindo limpeza de relacionamentos e
 * arquivos associados no storage.
 *
 * Funcionalidades:
 * - Remoção de música por ID específico
 * - Exclusão de arquivo de áudio do storage
 * - Exclusão de imagem de capa associada
 * - Limpeza de relacionamentos (curtidas, playlists)
 * - Validação de existência da música
 * - Resposta padronizada de confirmação
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";

/**
 * Controller Administrativo - Deletar Música
 *
 * Remove uma música específica do catálogo e todos os seus
 * relacionamentos (curtidas, associações em playlists).
 *
 * @param req.params.musicId - ID da música a ser removida
 * @returns Confirmação de remoção ou erro de validação
 */
const adminDeleteMusic = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId);    const serviceResponse = await AdminServiceImpl.deleteMusic(musicId);

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting music",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminDeleteMusic;
