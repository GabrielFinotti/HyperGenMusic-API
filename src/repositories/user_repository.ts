import { Op } from "sequelize";
import { User } from "../models";
import { IUserRepository } from "../types";

class UserRepository implements IUserRepository {
  async getAllUser() {
    try {
      const users = await User.findAll();

      return users.length > 0 ? users : null;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await User.findByPk(userId);

      return user ?? null;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });

      return user ?? null;
    } catch (error) {
      throw error;
    }
  }

  async getUserByTerm(term: string) {
    try {
      const whereClause = {
        [Op.or]: [
          { username: { [Op.like]: `%${term}%` } },
          { email: { [Op.like]: `%${term}%` } },
        ],
      };

      const users = await User.findAll({ where: whereClause });

      return users.length > 0 ? users : null;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data: any) {
    try {
      const newUser = await User.create(data);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, data: any) {
    try {
      const transaction = await User.sequelize?.transaction();
      const user = (await User.findByPk(userId, { transaction })) as User;

      try {
        await user.update(data, { transaction });

        await transaction?.commit();

        return user;
      } catch (error) {
        await transaction?.rollback();

        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string) {
    try {
      const result = await User.destroy({ where: { id: userId } });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
