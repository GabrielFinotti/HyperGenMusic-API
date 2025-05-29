/**
 * Controller Administrativo - Listar Todos os Usuários - HyperMusic API v2.0
 *
 * Gerencia a recuperação paginada de todos os usuários da plataforma
 * para administradores, incluindo dados completos e controle de acesso
 * restrito a usuários com privilégios administrativos.
 *
 * Funcionalidades:
 * - Listagem completa de usuários
 * - Paginação administrativa
 * - Controle de acesso restrito
 * - Dados completos de perfil
 * - Auditoria de consultas
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
 * Controller Administrativo - Listar Todos os Usuários
 *
 * Lista todos os usuários do sistema com paginação.
 * Acesso restrito a administradores e desenvolvedores.
 *
 * @param req.query.limit - Limite de resultados (padrão: 10)
 * @param req.query.offset - Registros a pular (padrão: 0)
 * @returns Lista paginada de usuários
 */
const adminGetAllUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    let limit = parseInt(query.limit as string);

    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    let offset = parseInt(query.offset as string);

    if (isNaN(offset) || offset < 0) {
      offset = 0;
    }    const serviceResponse = await AdminServiceImpl.getAllUsers(limit, offset);

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

export default adminGetAllUsers;
