/**
 * Controller de Registro de Usuário - HyperGenMusic API v2.0
 *
 * Gerencia o processo de criação de novos usuários na plataforma,
 * incluindo validação completa de dados, verificação de duplicatas
 * e criação segura de contas com hash de senhas.
 *
 * Funcionalidades:
 * - Validação de dados de usuário
 * - Verificação de email/username únicos
 * - Hash seguro de senhas
 * - Criação de registro no banco
 * - Resposta padronizada de confirmação
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { ResponseSuccess, UserData } from "../../types";
import { UserServiceImpl } from "../../services";
import { responseUtils } from "../../utils";

/**
 * Controller de Registro de Usuário
 *
 * Processa criação de novos usuários com validação completa.
 * Inclui hash de senha e verificação de duplicatas.
 *
 * @param req.body - Dados completos do usuário (UserData)
 * @returns Confirmação de criação ou erro de validação
 */
const userRegister = async (req: Request, res: Response) => {
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
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userRegister;
