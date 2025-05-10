import { Op } from "sequelize";
import { User } from "../models";
import { IUserRepository, UserAttributes } from "../types";

class UserRepository implements IUserRepository {
  async getAllUser() {
    try {
      const users = await User.findAll();

      return users.length > 0 ? users : null;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: number) {
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

  async getUserIncludingPassword(email: string) {
    try {
      const user = await User.findOne({
        where: { email },
        attributes: { include: ["password"] },
      });

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

  async createUser(data: Partial<UserAttributes>) {
    try {
      const newUser = await User.create(data as UserAttributes);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: number, data: Partial<UserAttributes>) {
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

  async deleteUser(userId: number) {
    try {
      const result = await User.destroy({ where: { id: userId } });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepository();
