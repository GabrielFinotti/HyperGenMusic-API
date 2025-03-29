import User from "../../models/userModel";
import { Op } from "sequelize";

interface UserAdminService {
  getAllUsers(): Promise<User[]>;
  searchUser(query: string, limit?: number): Promise<User[]>;
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
}

export default new UserAdminServiceImpl();
