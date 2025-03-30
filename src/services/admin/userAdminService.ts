import User from "../../models/userModel";
import { Op } from "sequelize";
import { UserInterface, DefaultResponseResult } from "../../types";
import { authUtils, handlingUtils, userUtils } from "../../utils";

interface UserAdminService {
  getAllUsers(): Promise<DefaultResponseResult>;
  getUserData(userId: number): Promise<DefaultResponseResult>;
  searchUser(query: string, limit?: number): Promise<DefaultResponseResult>;
  createUser(userData: UserInterface): Promise<DefaultResponseResult>;
  editUser(
    userId: number,
    userData: Partial<UserInterface>
  ): Promise<DefaultResponseResult>;
  deleteUser(userId: number): Promise<DefaultResponseResult>;
  deleteAllUsers(): Promise<DefaultResponseResult>;
}

class UserAdminServiceImpl implements UserAdminService {
  async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "email", "role"],
        order: [["createdAt", "DESC"]],
        limit: 20,
      });

      if (!users) {
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
        users
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

  async searchUser(query: string, limit?: number) {
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

      const whereCondition = {
        [Op.or]: [
          {
            username: {
              [Op.or]: searchTerms.map((term) => ({ [Op.like]: `%${term}%` })),
            },
          },
          {
            email: {
              [Op.or]: searchTerms.map((term) => ({ [Op.like]: `%${term}%` })),
            },
          },
        ],
      };

      const users = await User.findAll({
        where: whereCondition,
        limit: limit ?? 10,
        attributes: ["id", "username", "email", "role"],
      });

      if (!users) {
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
        users
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

      const existingUser = await userUtils.getUserData(
        undefined,
        userData.email,
        userData.username
      );

      if (existingUser) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          409,
          "Nome de usuário ou e-mail já está em uso!"
        );
      }

      if (!userData.role) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Cargo do usuário não definido!"
        );
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
        `O servidor encontrou um erro inesperado ao tentar registrar o usuário. Por favor, tente novamente mais tarde!`
      );
    }
  }

  async getUserData(userId: number) {
    try {
      if (!userId) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "ID do usuário inválido!"
        );
      }

      const user = await userUtils.getUserData(userId);

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
        `Erro ao buscar usuário, ${
          error instanceof Error ? error.message : String(error)
        }!`.red.bgBlack
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao tentar buscar o usuário. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async editUser(userId: number, userData: Partial<UserInterface>) {
    try {
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

      const user = await User.findOne({
        where: { id: userId },
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
        "O servidor encontrou um erro inesperado ao tentar atualizar o usuário. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async deleteUser(userId: number) {
    try {
      if (!userId) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "ID do usuário inválido"
        );
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Usuário não encontrado"
        );
      }

      await user.destroy();

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
      const users = await User.findAll();

      if (!users || users.length === 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Nenhum usuário encontrado"
        );
      }

      await Promise.all(users.map((user) => user.destroy()));

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        `${users.length} usuários foram excluídos com sucesso!`
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
