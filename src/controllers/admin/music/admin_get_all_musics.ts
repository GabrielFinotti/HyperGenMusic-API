/**
 * Controller de Listagem Administrativa de Música - HyperGenMusic API v2.0
 *
 * Gerencia a listagem completa do catálogo musical através do painel
 * administrativo com controles rígidos de paginação e validação
 * para operações de gestão do acervo.
 *
 * Funcionalidades:
 * - Listagem completa do catálogo musical
 * - Paginação obrigatória (limit/offset)
 * - Validação rigorosa de parâmetros
 * - Ordenação por critérios administrativos
 * - Metadados completos incluindo IDs
 * - Resposta estruturada para gestão
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { MusicServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";
import { Music } from "../../../models";

/**
 * Controller Administrativo - Listar Todas as Músicas
 *
 * Lista todas as músicas do catálogo com paginação estrita.
 * Requer parâmetros obrigatórios de limit e offset para controle administrativo.
 *
 * @param req.query.limit - Limite de resultados (obrigatório, positivo)
 * @param req.query.offset - Registros a pular (obrigatório, não-negativo)
 * @returns Lista paginada de músicas
 */
const adminGetAllMusics = async (req: Request, res: Response) => {
  try {
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

    const isError = await MusicServiceImpl.getAllMusics(limit, offset);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const musics = isError as ResponseSuccess<Music[]>;

    res.status(musics.statusCode).send(musics);
  } catch (error) {
    const err = responseUtils.createErrorResponse("An error occurred", 500);

    res.status(err.errorCode).send(err);
  }
};

export default adminGetAllMusics;
