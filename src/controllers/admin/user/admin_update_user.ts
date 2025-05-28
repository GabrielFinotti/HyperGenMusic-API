/**
 * Controller Administrativo - Atualizar Usuário - HyperMusic API v2.0
 *
 * Gerencia a atualização de dados de usuários através do painel
 * administrativo, permitindo modificação de privilégios, dados
 * pessoais e configurações de conta.
 *
 * Funcionalidades:
 * - Atualização administrativa completa
 * - Modificação de privilégios
 * - Validação de dados sensíveis
 * - Controle de acesso restrito
 * - Auditoria de alterações
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { UserServiceImpl } from "../../../services";
import { User } from "../../../models";
import { ResponseSuccess } from "../../../types";

/**
 * Controller Administrativo - Atualizar Usuário
 *
 * Atualiza os dados de um usuário específico através do painel administrativo.
 * Utiliza o serviço padrão de atualização com validações completas.
 *
 * @param req.params.id - ID do usuário a ser atualizado
 * @param req.body - Dados parciais do usuário para atualização
 * @returns Usuário atualizado ou erro de validação
 */
const adminUpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const isError = await UserServiceImpl.userUpdate(userId, userData);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while updating the user.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminUpdateUser;
