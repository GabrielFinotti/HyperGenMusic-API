/**
 * Controller Administrativo - Buscar Usuários por Termo - HyperMusic API v2.0
 *
 * Gerencia a busca de usuários por termo para administradores,
 * permitindo localização rápida de contas específicas através
 * de username, email ou outros campos relevantes.
 *
 * Funcionalidades:
 * - Busca administrativa por termo
 * - Múltiplos campos de pesquisa
 * - Paginação de resultados
 * - Acesso restrito a admins
 * - Resultados detalhados
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";
import { User } from "../../../models";

/**
 * Controller Administrativo - Buscar Usuários por Termo
 *
 * Realiza busca textual no banco de usuários por username,
 * email ou outros campos com resultados paginados.
 *
 * @param req.query.term - Termo de busca
 * @param req.query.limit - Limite de resultados (padrão: 10)
 * @param req.query.offset - Registros a pular (padrão: 0)
 * @returns Lista paginada de usuários encontrados
 */
const adminGetUsersTerm = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    let limit = parseInt(query.limit as string);

    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    let offset = parseInt(query.offset as string);

    if (isNaN(offset) || offset < 0) {
      offset = 0;
    }    const serviceResponse = await AdminServiceImpl.getUserByTerm(
      query.term as string,
      limit,
      offset
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const users = serviceResponse as ResponseSuccess<User[]>;

    res.status(users.statusCode).send(users);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching users.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminGetUsersTerm;
