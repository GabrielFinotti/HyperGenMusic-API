import User from "../../models/userModel";
import { UserInterface, UserResult } from "../../types";
import { authUtils, userUtils } from "../../utils";

export interface UserService {
  register(userData: UserInterface): Promise<UserResult>;
  login(email: string, password: string): Promise<UserResult>;
  getUserById(id: number): Promise<UserResult>;
  updateUser(id: number, userData: Partial<UserInterface>): Promise<UserResult>;
  deleteUser(id: number, authHeader: string): Promise<UserResult>;
}

class UserServiceImpl implements UserService {
  async register(userData: UserInterface): Promise<UserResult> {
    try {
      const confirmUserData = authUtils.userAuth.userDataVerification(userData);

      if (confirmUserData instanceof Array) {
        return {
          success: false,
          errors: confirmUserData,
          statusCode: 400,
        };
      }

      const existingUser = await userUtils.getUserData(
        undefined,
        userData.email,
        userData.username
      );

      if (existingUser) {
        return {
          success: false,
          message: "Nome de usuário ou e-mail já esta em uso!",
          statusCode: 409,
        };
      }

      await User.create(userData);

      return {
        success: true,
        message: "Usuário registrado com sucesso!",
        statusCode: 201,
      };
    } catch (error) {
      console.error(`Erro ao registrar usuário, ${error}!`.red.bgBlack);

      return {
        success: false,
        message: "Erro interno do servidor",
        statusCode: 500,
      };
    }
  }

  async login(email: string, password: string): Promise<UserResult> {
    try {
      if (!email || !password) {
        return {
          success: false,
          message: "Email e senha são obrigatórios!",
          statusCode: 400,
        };
      }

      const getProfile = await User.findOne({
        where: { email },
        attributes: { include: ["password"] },
      });

      if (!getProfile) {
        return {
          success: false,
          message: "Usuário não encontrado!",
          statusCode: 404,
        };
      }

      const isValidPassword = await getProfile.comparePassword(password);

      if (!isValidPassword) {
        return {
          success: false,
          message: "Senha inválida!",
          statusCode: 401,
        };
      }

      const token = await authUtils.jwt.generateToken(getProfile.id);

      if (typeof token !== "string") {
        return {
          success: false,
          message: token.error,
          statusCode: 500,
        };
      }

      return {
        success: true,
        message: "Usuário logado com sucesso!",
        token,
        statusCode: 200,
      };
    } catch (error) {
      console.error("Erro durante o login:", error);

      return {
        success: false,
        message: "Erro interno do servidor",
        statusCode: 500,
      };
    }
  }

  async getUserById(id: number): Promise<UserResult> {
    try {
      const userData = await userUtils.getUserData(id);

      if (!userData) {
        return {
          success: false,
          message: "Usuário não encontrado!",
          statusCode: 404,
        };
      }

      return {
        success: true,
        user: userData.toPublicJSON(),
        statusCode: 200,
      };
    } catch (error) {
      console.error(`Erro ao obter dados do usuário: ${error}`.red.bgBlack);

      return {
        success: false,
        message: "Erro interno do servidor!",
        statusCode: 500,
      };
    }
  }

  async updateUser(
    id: number,
    userData: Partial<UserInterface>
  ): Promise<UserResult> {
    try {
      const validatedUserData =
        authUtils.userAuth.updateDataVerification(userData);

      if (Array.isArray(validatedUserData)) {
        return {
          success: false,
          errors: validatedUserData,
          statusCode: 400,
        };
      }

      const user = await User.findOne({
        where: { id },
        attributes: {
          include: validatedUserData.password ? ["password"] : [],
        },
      });

      if (!user) {
        return {
          success: false,
          message: "Usuário não encontrado!",
          statusCode: 404,
        };
      }

      const result = await userUtils.userDataUpdate(validatedUserData, user);

      if ("error" in result) {
        return {
          success: false,
          message: result.error,
          statusCode: 400,
        };
      }

      return {
        success: true,
        message: result.message,
        statusCode: 200,
      };
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);

      return {
        success: false,
        message: "Erro interno do servidor",
        statusCode: 500,
      };
    }
  }

  async deleteUser(id: number, authHeader: string): Promise<UserResult> {
    try {
      const userData = await userUtils.getUserData(id);

      if (!userData) {
        return {
          success: false,
          message: "Usuário não encontrado!",
          statusCode: 404,
        };
      }

      if (!authHeader) {
        return {
          success: false,
          message: "Não autorizado!",
          statusCode: 401,
        };
      }

      const revogeToken = await authUtils.jwt.deleteToken(authHeader);

      if (revogeToken.error) {
        return {
          success: false,
          message: `Erro ao excluir usuário: ${revogeToken.error}`,
          statusCode: 400,
        };
      }

      await userData.destroy();

      return {
        success: true,
        message: `Usuário excluído com sucesso, ${revogeToken.message}!`,
        statusCode: 200,
      };
    } catch (error) {
      console.error(`Erro ao excluir usuário: ${error}`.red.bgBlack);
      
      return {
        success: false,
        message: "Erro interno do servidor!",
        statusCode: 500,
      };
    }
  }
}

export default new UserServiceImpl();
