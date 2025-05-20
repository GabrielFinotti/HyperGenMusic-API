import { Op, WhereOptions } from "sequelize";
import { User } from "../models";
import { IUserRepository, UserAttributes } from "../types";

class UserRepository implements IUserRepository {
  async getAllUser(limit: number = 10, offset: number = 0) {
    try {
      const users = await User.findAll({
        limit,
        offset,
      });

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

  async getUserIncludingPassword(email?: string, userId?: number) {
    try {
      const whereClause: WhereOptions<UserAttributes> = {};

      if (email) {
        whereClause.email = email;
      }

      if (userId) {
        whereClause.id = userId;
      }

      const user = await User.findOne({
        where: whereClause,
        attributes: { include: ["password"] },
      });

      return user ?? null;
    } catch (error) {
      throw error;
    }
  }

  async getUserByTerm(term: string, limit: number = 10, offset: number = 0) {
    try {
      const whereClause = {
        [Op.or]: [
          { username: { [Op.like]: `%${term}%` } },
          { email: { [Op.like]: `%${term}%` } },
        ],
      };

      const users = await User.findAll({
        where: whereClause,
        limit,
        offset,
      });

      return users.length > 0 ? users : null;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data: Partial<UserAttributes>) {
    try {
      await User.create(data as UserAttributes);
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
      await User.destroy({ where: { id: userId } });
    } catch (error) {
      throw error;
    }
  }

  async deleteAllUsers() {
    try {
      const transaction = await User.sequelize?.transaction();

      try {
        const result = await User.destroy({
          where: {},
          truncate: true,
          transaction,
        });

        await transaction?.commit();

        return result;
      } catch (error) {
        await transaction?.rollback();

        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepository();
