/**
 * Controller de Remoção Completa de Usuários - HyperMusic API v2.0
 *
 * Gerencia a operação destrutiva de remoção completa da base de
 * usuários através do painel administrativo. Remove todos os usuários
 * do sistema e relacionamentos associados.
 *
 * Funcionalidades:
 * - Remoção completa da base de usuários
 * - Limpeza de relacionamentos (playlists, curtidas)
 * - Revogação de tokens de autenticação
 * - Operação irreversível (uso com cautela)
 * - Logs de auditoria da operação
 * - Resposta padronizada de confirmação
 *
 * ⚠️ ATENÇÃO: Operação destrutiva, use apenas em desenvolvimento!
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";

/**
 * Controller Administrativo - Remover Todos os Usuários
 *
 * ⚠️ OPERAÇÃO DESTRUTIVA - Remove todos os usuários do sistema.
 * Deve ser usado com extrema cautela apenas em ambientes de desenvolvimento.
 *
 * @returns Confirmação do número de usuários removidos
 */
const adminDeleteAllUsers = async (req: Request, res: Response) => {
  try {
    const isError = await AdminServiceImpl.deleteAllUsers();

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting all users.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminDeleteAllUsers;
