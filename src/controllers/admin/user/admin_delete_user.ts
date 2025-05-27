/**
 * Controller Administrativo - Deletar Usuário - HyperGenMusic API v2.0
 *
 * Gerencia a remoção individual de usuários através do painel
 * administrativo, incluindo revogação de tokens, limpeza de dados
 * associados e auditoria de exclusões.
 *
 * Funcionalidades:
 * - Exclusão administrativa individual
 * - Revogação de todos os tokens
 * - Limpeza de dados relacionados
 * - Validação de permissões
 * - Log de auditoria
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { UserServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";
import { User } from "../../../models";

/**
 * Controller Administrativo - Deletar Usuário
 *
 * Remove um usuário específico do sistema, incluindo revogação
 * do token ativo e limpeza de dados relacionados.
 *
 * @param req.params.id - ID do usuário a ser removido
 * @returns Confirmação de remoção ou erro de validação
 */
const adminDeleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId <= 0) {
      const err = responseUtils.createErrorResponse(
        "Invalid user ID provided.",
        400
      );

      res.status(err.errorCode).send(err);

      return;
    }

    const userData = await UserServiceImpl.getProfileData(userId);

    if (!userData.success) {
      res.status(userData.errorCode).send(userData);

      return;
    }

    const lastToken = (userData as ResponseSuccess<User>).data?.lastToken;

    const isError = await UserServiceImpl.userDelete(userId, lastToken);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting the user.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminDeleteUser;
