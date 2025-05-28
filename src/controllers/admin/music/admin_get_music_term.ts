/**
 * Controller Administrativo - Busca de Músicas por Termo - HyperMusic API v2.0
 *
 * Fornece funcionalidade de busca textual avançada no catálogo de músicas
 * para administradores, permitindo busca por título, artista ou gênero
 * com paginação rigorosa e validação de parâmetros.
 *
 * Funcionalidades:
 * - Busca textual em título, artista e gênero
 * - Paginação obrigatória com limit e offset
 * - Validação rigorosa de parâmetros
 * - Resultados ordenados por relevância
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { MusicServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";
import { Music } from "../../../models";

/**
 * Controller Administrativo - Buscar Músicas por Termo
 *
 * Realiza busca textual no catálogo de músicas por título,
 * artista ou gênero com resultados paginados.
 *
 * @param req.query.term - Termo de busca
 * @param req.query.limit - Limite de resultados (obrigatório)
 * @param req.query.offset - Registros a pular (obrigatório)
 * @returns Lista paginada de músicas encontradas
 */
const adminGetMusicTerm = async (req: Request, res: Response) => {
  try {
    const query = req.query.term as string;

    const limit = parseInt(req.query.limit as string);

    if (isNaN(limit) || limit <= 0) {
      const err = responseUtils.createErrorResponse(
        "Limit must be a positive number",
        400
      );

      res.status(err.errorCode).send(err);

      return;
    }

    const offset = parseInt(req.query.offset as string);

    if (isNaN(offset) || offset < 0) {
      const err = responseUtils.createErrorResponse(
        "Offset must be a non-negative number",
        400
      );

      res.status(err.errorCode).send(err);

      return;
    }

    const isError = await MusicServiceImpl.getMusicByTerm(query, limit, offset);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const musics = isError as ResponseSuccess<Music[]>;

    res.status(musics.statusCode).send(musics);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching music by term",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminGetMusicTerm;
