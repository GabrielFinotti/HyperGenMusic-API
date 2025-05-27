/**
 * Controller de Atualização de Usuário - HyperGenMusic API v2.0
 *
 * Gerencia o processo de atualização de dados de perfil dos usuários,
 * incluindo upload de imagens, validação de dados e preservação
 * de informações sensíveis como senhas hasheadas.
 *
 * Funcionalidades:
 * - Atualização de dados pessoais
 * - Upload de imagem de perfil
 * - Validação de dados modificados
 * - Preservação da segurança
 * - Resposta com dados atualizados
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { UserServiceImpl } from "../../services";
import { ResponseSuccess, UserData } from "../../types";
import { User } from "../../models";

/**
 * Controller de Atualização de Perfil
 *
 * Atualiza dados do perfil do usuário autenticado.
 * Suporta upload de nova imagem de perfil via Multer.
 *
 * @param req.params.userId - ID do usuário (extraído do token)
 * @param req.body - Dados parciais para atualização
 * @param req.file - Nova imagem de perfil (opcional)
 * @returns Dados atualizados do usuário
 */
const userUpdate = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const userDataUpdate = req.body as UserData;

    if (req.file) {
      userDataUpdate.imageUrl = (req.file as Express.MulterS3.File).location;
    }

    const isError = await UserServiceImpl.userUpdate(userId, userDataUpdate);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userUpdate;
