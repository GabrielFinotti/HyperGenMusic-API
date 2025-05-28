/**
 * Controller Administrativo - Criar Usuário - HyperMusic API v2.0
 *
 * Gerencia a criação de novos usuários através do painel administrativo,
 * permitindo que administradores criem contas com privilégios específicos
 * e configurações avançadas.
 *
 * Funcionalidades:
 * - Criação administrativa de usuários
 * - Definição de privilégios
 * - Validação rigorosa de dados
 * - Bypass de restrições padrão
 * - Auditoria de criação
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { UserServiceImpl } from "../../../services";
import { ResponseSuccess, UserData } from "../../../types";

/**
 * Controller Administrativo - Criação de Usuário
 *
 * Cria novos usuários através do painel administrativo.
 * Utiliza o mesmo serviço de registro padrão com validações.
 *
 * @param req.body - Dados completos do usuário (UserData)
 * @returns Confirmação de criação ou erro de validação
 */
const adminCreateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserData;

    const isError = await UserServiceImpl.userRegister(userData);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while creating user.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminCreateUser;
