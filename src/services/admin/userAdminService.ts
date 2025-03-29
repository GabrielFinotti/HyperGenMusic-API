import User from "../../models/userModel";
import { Op } from "sequelize";
import { UserInterface, UserResult } from "../../types";
import { authUtils, userUtils } from "../../utils";

interface UserAdminService {
  getAllUsers(): Promise<User[]>;
  //getUserData(userId: string): Promise<User>;
  searchUser(query: string, limit?: number): Promise<User[]>;
  createUser(userData: UserInterface): Promise<UserResult>;
  // editUser(userId: string, userData: UserInterface): Promise<UserResult>;
  // deleteUser(userId: string): Promise<UserResult>;
  // deleteAllUsers(): Promise<UserResult[]>;
}

class UserAdminServiceImpl implements UserAdminService {
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "email", "role"],
        order: [["createdAt", "DESC"]],
        limit: 20,
      });

      if (!users) {
        return [];
      }

      return users;
    } catch (error) {
      throw error;
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
}

export default new UserAdminServiceImpl();
