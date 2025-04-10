import { UserInterface, IUserRepository, UserService } from "../../types";
import { authUtils, handlingUtils } from "../../utils";
import { userRepository } from "../../repositories";

class UserServiceImpl implements UserService {
  constructor(private repository: IUserRepository = userRepository) {}

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

      const existingUser = await this.repository.findByUsernameOrEmail(
        userData.username,
        userData.email
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

      const newUser = await this.repository.create(userData);

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

      const getProfile = await this.repository.findByEmail(email, true);

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
      const userData = await this.repository.findById(id);

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

      const user = await this.repository.findById(
        id,
        userData.password ? true : false
      );

      if (!user) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado!"
        );
      }

      const result = await this.repository.update(user, userData);

      if (typeof result === "string") {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          result
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Dados atualizados com sucesso!",
        result.toPublicJSON()
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
      const user = await this.repository.findById(id);

      if (!user) {
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

      await this.repository.delete(user);

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
