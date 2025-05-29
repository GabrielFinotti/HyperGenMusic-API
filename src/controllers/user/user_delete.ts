/**
 * Controller de Exclusão de Usuário - HyperMusic API v2.0
 *
 * Gerencia o processo de remoção de contas de usuário da plataforma,
 * incluindo revogação de tokens, limpeza de dados associados e
 * confirmação segura da operação.
 *
 * Funcionalidades:
 * - Autenticação via token JWT
 * - Revogação de tokens ativos
 * - Exclusão de dados do usuário
 * - Limpeza de relacionamentos
 * - Resposta de confirmação
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { UserServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { responseUtils } from "../../utils";

const userDelete = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    
    const serviceResponse = await UserServiceImpl.userDelete(
      parseInt(req.params.userId),
      token
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal Server Error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userDelete;
