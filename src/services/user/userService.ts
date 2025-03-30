import User from "../../models/userModel";
import { UserInterface } from "../../types";
import { DefaultResponseResult } from "../../types/handling/defaultReponse";
import { authUtils, handlingUtils, userUtils } from "../../utils";

export interface UserService {
  register(userData: UserInterface): Promise<DefaultResponseResult>;
  login(email: string, password: string): Promise<DefaultResponseResult>;
  getUserById(id: number): Promise<DefaultResponseResult>;
  updateUser(
    id: number,
    userData: Partial<UserInterface>
  ): Promise<DefaultResponseResult>;
  deleteUser(id: number, authHeader: string): Promise<DefaultResponseResult>;
}

class UserServiceImpl implements UserService {
  async register(userData: UserInterface) {
    try {
      const confirmUserData = authUtils.userAuth.userDataVerification(userData);

      if (confirmUserData instanceof Array) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          confirmUserData
        );
      }

      const existingUser = await userUtils.getUserData(
        undefined,
        userData.email,
        userData.username
      );

      if (existingUser) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          409,
          "Nome de usuário ou e-mail já esta em uso!"
        );
      }

      if (!userData.role) {
        userData.role = "user";
      }

      const newUser = await User.create(userData);

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        201,
        "Usuário registrado com sucesso!",
        newUser.toPublicJSON()
      );
    } catch (error) {
      console.error(
        `Erro ao registrar usuário, ${
          error instanceof Error ? error.message : String(error)
        }!`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao registrar o usuário. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async login(email: string, password: string) {
    try {
      if (!email || !password) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Email e senha são obrigatórios!"
        );
      }

      const getProfile = await User.findOne({
        where: { email },
        attributes: { include: ["password"] },
      });

      if (!getProfile) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado!"
        );
      }

      const isValidPassword = await getProfile.comparePassword(password);

      if (!isValidPassword) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          401,
          "Senha Incorreta!"
        );
      }

      const token = await authUtils.jwt.generateToken(getProfile.id);

      if (typeof token !== "string") {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          500,
          token.error
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Login efetuado com sucesso!",
        token
      );
    } catch (error) {
      console.error(
        `Erro durante o processo de login: ${
          error instanceof Error ? error.message : String(error)
        }!`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao fazer login. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async getUserById(id: number) {
    try {
      const userData = await userUtils.getUserData(id);

      if (!userData) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado!"
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Seus dados foram encontrados!",
        userData.toPublicJSON()
      );
    } catch (error) {
      console.error(
        `Erro ao obter dados do usuário: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao recuperar seus dados. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async updateUser(id: number, userData: Partial<UserInterface>) {
    try {
      const validatedUserData =
        authUtils.userAuth.updateDataVerification(userData);

      if (validatedUserData instanceof Array) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          validatedUserData
        );
      }

      const user = await User.findOne({
        where: { id },
        attributes: {
          include: validatedUserData.password ? ["password"] : [],
        },
      });

      if (!user) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado!"
        );
      }

      const result = await userUtils.userDataUpdate(validatedUserData, user);

      if (result.error) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          result.error
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        result.message
      );
    } catch (error) {
      console.error(
        `Erro ao atualizar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao atualizar os seus dados. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async deleteUser(id: number, authHeader: string) {
    try {
      const userData = await userUtils.getUserData(id);

      if (!userData) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado!"
        );
      }

      if (!authHeader) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          401,
          "Você não está autorizado a realizar essa ação!"
        );
      }

      const revogeToken = await authUtils.jwt.deleteToken(authHeader);

      if (revogeToken.error) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          `Ocorreu um erro ao excluir seu perfil: ${revogeToken.error}!`
        );
      }

      await userData.destroy();

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        `Seu perfil foi excluído com sucesso, ${revogeToken.message}!`
      );
    } catch (error) {
      console.error(
        `Erro ao excluir usuário: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao excluir seu perfil. Por favor, tente novamente mais tarde!"
      );
    }
  }
}

export default new UserServiceImpl();
