/**
 * Controller de Dados de Música - HyperMusic API v2.0
 *
 * Gerencia a recuperação de dados detalhados de uma música específica
 * do catálogo, fornecendo informações completas incluindo metadados,
 * URLs de arquivo e imagem de capa.
 *
 * Funcionalidades:
 * - Busca por ID específico
 * - Validação de parâmetros
 * - Dados completos da música
 * - Tratamento de não encontrado
 * - Resposta otimizada
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { MusicServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { Music } from "../../models";

/**
 * Controller Público - Obter Dados de Música
 *
 * Recupera informações detalhadas de uma música específica
 * incluindo metadados completos e URLs de arquivos.
 *
 * @param req.params.musicId - ID único da música
 * @returns Dados completos da música ou erro se não encontrada
 */
const getMusicData = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId as string);

    if (isNaN(musicId)) {
      const err = responseUtils.createErrorResponse(
        "Invalid music ID provided.",
        400
      );

      res.status(err.errorCode).send(err);

      return;
    }    const serviceResponse = await MusicServiceImpl.getMusicData(musicId);

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<Music>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching music data.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getMusicData;
