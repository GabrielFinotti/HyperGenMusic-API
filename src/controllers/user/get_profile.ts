/**
 * Controller de Perfil de Usuário - HyperMusic API v2.0
 *
 * Gerencia a recuperação de dados do perfil do usuário autenticado,
 * fornecendo informações pessoais e configurações da conta de
 * forma segura e eficiente.
 *
 * Funcionalidades:
 * - Autenticação via token JWT
 * - Recuperação de dados do perfil
 * - Exclusão de dados sensíveis
 * - Resposta otimizada
 * - Tratamento de erros
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { UserServiceImpl } from "../../services";
import { User } from "../../models";
import { ResponseSuccess } from "../../types";

/**
 * Controller de Perfil do Usuário
 *
 * Retorna dados do perfil do usuário autenticado.
 * Extrai userId do token JWT decodificado.
 *
 * @param req.params.userId - ID do usuário (extraído do token)
 * @returns Dados completos do perfil do usuário
 */
const getProfile = async (req: Request, res: Response) => {
  try {
    const isError = await UserServiceImpl.getProfileData(
      parseInt(req.params.userId)
    );

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal Server Error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default getProfile;
