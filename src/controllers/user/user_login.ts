/**
 * Controller de Login de Usuário - HyperMusic API v2.0
 *
 * Gerencia o processo de autenticação de usuários existentes,
 * validando credenciais e gerando tokens JWT para acesso à API.
 * Suporta tokens de longa duração para funcionalidade "lembrar-me".
 *
 * Funcionalidades:
 * - Validação de email e senha
 * - Geração de tokens JWT (curta/longa duração)
 * - Resposta com dados parciais do usuário
 * - Tratamento centralizado de erros
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { UserServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { User } from "../../models";

/**
 * Controller de Login de Usuário
 *
 * Processa autenticação de usuários existentes e gera tokens JWT.
 * Suporta tokens de longa duração para "lembrar-me".
 *
 * @param req.body.email - Email do usuário
 * @param req.body.password - Senha do usuário
 * @param req.body.isLong - Se deve gerar token de longa duração
 * @returns Token JWT e dados parciais do usuário
 */
const userLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body as {
      email: string;
      password: string;
      isLong: boolean;
    };
    
    const serviceResponse = await UserServiceImpl.userLogin(
      userData.email,
      userData.password,
      userData.isLong
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<
      (string | Partial<User>)[]
    >;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userLogin;
