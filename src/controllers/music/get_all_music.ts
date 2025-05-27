/**
 * Controller de Listagem de Músicas - HyperGenMusic API v2.0
 *
 * Gerencia a recuperação paginada do catálogo completo de músicas,
 * oferecendo acesso público ao acervo musical da plataforma com
 * otimizações de performance e controle de carga.
 *
 * Funcionalidades:
 * - Listagem paginada do catálogo
 * - Controle de limite por página
 * - Validação de parâmetros
 * - Otimização de consultas
 * - Resposta estruturada
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
 * Controller Público - Listar Todas as Músicas
 *
 * Lista todas as músicas disponíveis no catálogo público
 * com paginação automática e valores padrão flexíveis.
 *
 * @param req.query.limit - Limite de resultados (padrão: 10)
 * @param req.query.offset - Registros a pular (padrão: 0)
 * @returns Lista paginada de músicas do catálogo
 */
const getAllMusic = async (req: Request, res: Response) => {
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

    const isError = await MusicServiceImpl.getAllMusics(limit, offset);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<Music[]>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching music.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getAllMusic;
