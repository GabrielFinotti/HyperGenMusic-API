/**
 * Controller de Filtro por Gênero - HyperMusic API v2.0
 *
 * Gerencia a recuperação de músicas filtradas por gênero musical,
 * oferecendo busca especializada com paginação para categorização
 * do catálogo musical da plataforma.
 *
 * Funcionalidades:
 * - Filtro por gênero musical
 * - Paginação flexível
 * - Validação de parâmetros
 * - Busca otimizada
 * - Resposta estruturada
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
 * Controller Público - Filtrar Músicas por Gênero
 *
 * Filtra o catálogo de músicas por gênero específico
 * com paginação flexível e valores padrão.
 *
 * @param req.query.genre - Gênero musical (obrigatório)
 * @param req.query.limit - Limite de resultados (padrão: 10)
 * @param req.query.offset - Registros a pular (padrão: 0)
 * @returns Lista paginada de músicas do gênero especificado
 */
const getMusicGenre = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    let limit = parseInt(query.limit as string);

    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    let offset = parseInt(query.offset as string);

    if (isNaN(offset) || offset < 0) {
      offset = 0;
    }

    if (!query.genre) {
      const err = responseUtils.createErrorResponse("Genre is required.", 400);

      res.status(err.errorCode).send(err);

      return;
    }

    const isError = await MusicServiceImpl.getMusicByGenre(
      query.genre as string,
      limit,
      offset
    );

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<Music[]>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching music genre.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getMusicGenre;
