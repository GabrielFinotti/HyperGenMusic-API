import { UserInterface, IUserRepository, UserAdminService } from "../../types";
import { authUtils, handlingUtils } from "../../utils";
import { userRepository } from "../../repositories";

class UserAdminServiceImpl implements UserAdminService {
  constructor(private repository: IUserRepository = userRepository) {}

  async getAllUsers(limit = 20, offset = 0) {
    try {
      const users = await this.repository.findAll(limit, offset);

      if (!users || users.length === 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Nenhum usuário encontrado!"
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        `${users.length} usuários encontrados!`,
        users.map((user) => user.toPublicJSON())
      );
    } catch (error) {
      console.error(
        `Erro ao buscar usuários: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar buscar usuários. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async getUserData(userId: number) {
    try {
      if (!userId || isNaN(userId)) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "ID do usuário inválido!"
        );
      }

      const user = await this.repository.findById(userId);

      if (!user) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado!"
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Usuário encontrado!",
        user.toPublicJSON()
      );
    } catch (error) {
      console.error(
        `Erro ao buscar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar buscar o usuário. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async searchUser(query: string, limit = 10, offset = 0) {
    try {
      if (!query || query.trim() === "") {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Nenhum termo de pesquisa válido encontrado!"
        );
      }

      if (limit && (isNaN(limit) || limit <= 0)) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Limite deve ser um número maior que 0!"
        );
      }

      const searchTerms = query
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0);

      if (searchTerms.length === 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Nenhum termo de pesquisa válido encontrado!"
        );
      }

      const users = await this.repository.findByTerms(
        searchTerms,
        limit,
        offset
      );

      if (!users || users.length === 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Nenhum usuário encontrado!"
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        `${users.length} usuários encontrados!`,
        users.map((user) => user.toPublicJSON())
      );
    } catch (error) {
      console.error(
        `Erro ao buscar usuários: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar buscar usuários. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async createUser(userData: UserInterface) {
    try {
      if (!userData) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Dados do usuário inválidos!"
        );
      }

      const dataVerification =
        authUtils.userAuth.userDataVerification(userData);

      if (dataVerification instanceof Array) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          dataVerification
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
          "Nome de usuário ou e-mail já está em uso!"
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
        `Erro ao registrar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar registrar o usuário. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async editUser(userId: number, userData: Partial<UserInterface>) {
    try {
      if (!userId || isNaN(userId)) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "ID de usuário inválido!"
        );
      }

      const validatedUserData =
        authUtils.userAuth.updateDataVerification(userData);

      if (validatedUserData instanceof Array) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Dados inválidos",
          validatedUserData
        );
      }

      const user = await this.repository.findById(
        userId,
        validatedUserData.password ? true : false
      );

      if (!user) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado!"
        );
      }

      // Remove campos indefinidos
      Object.keys(validatedUserData).forEach((key) => {
        if (validatedUserData[key as keyof UserInterface] === undefined) {
          delete validatedUserData[key as keyof UserInterface];
        }
      });

      const updatedUser = await this.repository.update(user, validatedUserData);

      if (typeof updatedUser === "string") {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          updatedUser
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Usuário atualizado com sucesso!",
        updatedUser.toPublicJSON()
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
        "O servidor encontrou um erro inesperado ao tentar atualizar o usuário. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async deleteUser(userId: number) {
    try {
      if (!userId || isNaN(userId)) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "ID do usuário inválido"
        );
      }

      const user = await this.repository.findById(userId);

      if (!user) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado"
        );
      }

      const result = await this.repository.delete(user);

      if (!result) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          500,
          "Erro ao excluir usuário"
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Usuário excluído com sucesso!",
        user.toPublicJSON()
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
        "O servidor encontrou um erro inesperado ao tentar excluir o usuário. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async deleteAllUsers() {
    try {
      const users = await this.repository.findAll(1000); // Aumentar limite para obter todos os usuários

      if (!users || users.length === 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Nenhum usuário encontrado"
        );
      }

      const result = await this.repository.deleteAll();

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        `${
          result > 0 ? result : users.length
        } usuários foram excluídos com sucesso!`
      );
    } catch (error) {
      console.error(
        `Erro ao excluir todos os usuários: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar excluir todos os usuários. Por favor, tente novamente mais tarde!"
      );
    }
  }
}

export default new UserAdminServiceImpl();
