import User from "../../models/userModel";
import { Op } from "sequelize";
import { UserInterface, UserResult } from "../../types";
import { authUtils, userUtils } from "../../utils";

interface UserAdminService {
  getAllUsers(): Promise<UserResult>;
  getUserData(userId: number): Promise<UserResult>;
  searchUser(query: string, limit?: number): Promise<User[]>;
  createUser(userData: UserInterface): Promise<UserResult>;
  editUser(
    userId: number,
    userData: Partial<UserInterface>
  ): Promise<UserResult>;
  deleteUser(userId: number): Promise<UserResult>;
  deleteAllUsers(): Promise<UserResult>;
}

class UserAdminServiceImpl implements UserAdminService {
  async getAllUsers(): Promise<UserResult> {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "email", "role"],
        order: [["createdAt", "DESC"]],
        limit: 20,
      });

      if (!users) {
        return {
          success: true,
          user: [],
          statusCode: 200,
        };
      }

      return {
        success: true,
        user: users,
        statusCode: 200,
      };
    } catch (error) {
      console.error(`Erro ao buscar usuários: ${error}`.red.bgBlack);
      return {
        success: false,
        message: "Erro interno do servidor",
        statusCode: 500,
      };
    }
  }

  async searchUser(query: string, limit?: number): Promise<User[]> {
    try {
      if (!query || query.trim() === "") {
        throw new Error("Query inválida");
      }

      const searchTerms = query
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0);

      if (searchTerms.length === 0) {
        throw new Error("Nenhum termo de pesquisa válido encontrado");
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
        return [];
      }

      return users;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData: UserInterface): Promise<UserResult> {
    try {
      if (!userData) {
        throw new Error("Dados do usuário inválidos");
      }

      const dataVerification =
        authUtils.userAuth.userDataVerification(userData);

      if (dataVerification instanceof Array) {
        return {
          success: false,
          errors: dataVerification,
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
          message: "Nome de usuário ou e-mail já está em uso!",
          statusCode: 409,
        };
      }

      if (!userData.role) {
        return {
          success: false,
          message: "Cargo do usuário não definido",
          statusCode: 400,
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

  async getUserData(userId: number): Promise<UserResult> {
    try {
      if (!userId) {
        throw new Error("ID do usuário inválido");
      }

      const user = await userUtils.getUserData(userId);

      if (!user) {
        return {
          success: false,
          message: "Usuário não encontrado",
          statusCode: 404,
        };
      }

      return {
        success: true,
        message: "Usuário encontrado",
        user: user.toPublicJSON(),
        statusCode: 200,
      };
    } catch (error) {
      console.error(`Erro ao buscar usuário, ${error}!`.red.bgBlack);

      return {
        success: false,
        message: "Error interno do Servidor",
        statusCode: 500,
      };
    }
  }

  async editUser(
    userId: number,
    userData: Partial<UserInterface>
  ): Promise<UserResult> {
    try {
      const validatedUserData =
        authUtils.userAuth.updateDataVerification(userData);

      if (validatedUserData instanceof Array) {
        return {
          success: false,
          errors: validatedUserData,
          statusCode: 400,
        };
      }

      const user = await User.findOne({
        where: { id: userId },
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

  async deleteUser(userId: number): Promise<UserResult> {
    try {
      if (!userId) {
        throw new Error("ID do usuário inválido");
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return {
          success: false,
          message: "Usuário não encontrado",
          statusCode: 404,
        };
      }

      await user.destroy();

      return {
        success: true,
        message: "Usuário excluído com sucesso!",
        user: user.toPublicJSON(),
        statusCode: 200,
      };
    } catch (error) {
      console.error(`Erro ao excluir usuário, ${error}!`.red.bgBlack);

      return {
        success: false,
        message: "Erro interno do servidor",
        statusCode: 500,
      };
    }
  }

  async deleteAllUsers(): Promise<UserResult> {
    try {
      const users = await User.findAll();

      if (!users || users.length === 0) {
        return {
          success: false,
          message: "Nenhum usuário encontrado",
          statusCode: 404,
        };
      }

      await Promise.all(users.map((user) => user.destroy()));

      return {
        success: true,
        message: `${users.length} usuários foram excluídos com sucesso!`,
        user: users.map((user) => user.toPublicJSON()),
        statusCode: 200,
      };
    } catch (error) {
      console.error(`Erro ao excluir todos os usuários, ${error}!`.red.bgBlack);

      return {
        success: false,
        message: "Erro interno do servidor",
        statusCode: 500,
      };
    }
  }
}

export default new UserAdminServiceImpl();
