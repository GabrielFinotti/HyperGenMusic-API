/**
 * Controller de Busca por Termo - HyperGenMusic API v2.0
 *
 * Gerencia a busca textual no catálogo musical por termo livre,
 * pesquisando em múltiplos campos (título, artista, álbum) com
 * paginação e relevância otimizada.
 *
 * Funcionalidades:
 * - Busca textual multi-campo
 * - Paginação inteligente
 * - Validação de entrada
 * - Resultados relevantes
 * - Performance otimizada
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { MusicServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { Music } from "../../models";

/**
 * Controller Público - Buscar Músicas por Termo
 *
 * Realiza busca textual no catálogo por título, artista ou gênero.
 * Utiliza paginação flexível com valores padrão.
 *
 * @param req.query.term - Termo de busca
 * @param req.query.limit - Limite de resultados (padrão: 10)
 * @param req.query.offset - Registros a pular (padrão: 0)
 * @returns Lista paginada de músicas encontradas
 */
const getMusicTerm = async (req: Request, res: Response) => {
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

    const isError = await MusicServiceImpl.getMusicByTerm(
      query.term as string,
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
      "An error occurred while fetching music term.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getMusicTerm;
