import { Op } from "sequelize";
import User from "../models/User";
import { IUserRepository, UserInterface } from "../types";
import sequelize from "../config/database/databaseConfig";

class UserRepository implements IUserRepository {
  constructor(private userModel = User) {}

  async findById(userId: number, includePassword = false) {
    try {
      return await this.userModel.findByPk(userId, {
        attributes: includePassword ? { include: ["password"] } : undefined,
      });
    } catch (error) {
      throw new Error(
        `Erro ao encontrar usuário por ID: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async findByEmail(email: string, includePassword = false) {
    try {
      return await this.userModel.findOne({
        where: { email },
        attributes: includePassword ? { include: ["password"] } : undefined,
      });
    } catch (error) {
      throw new Error(
        `Erro ao encontrar usuário por email: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async findByUsername(username: string, includePassword = false) {
    try {
      return await this.userModel.findOne({
        where: { username },
        attributes: includePassword ? { include: ["password"] } : undefined,
      });
    } catch (error) {
      throw new Error(
        `Erro ao encontrar usuário por username: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async findByUsernameOrEmail(
    username: string,
    email: string,
    includePassword = false
  ) {
    try {
      return await this.userModel.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
        attributes: includePassword ? { include: ["password"] } : undefined,
      });
    } catch (error) {
      throw new Error(
        `Erro ao encontrar usuário por username ou email: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async findByTerms(searchTerms: string[], limit = 10, offset = 0) {
    try {
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

      return await this.userModel.findAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(
        `Erro ao encontrar usuários por termos: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async findAll(limit?: number, offset?: number) {
    try {
      return await this.userModel.findAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(
        `Erro ao encontrar todos os usuários: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async create(userData: UserInterface) {
    try {
      return await this.userModel.create(userData);
    } catch (error) {
      throw new Error(
        `Erro ao criar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async update(user: User, userData: Partial<UserInterface>) {
    const transaction = await sequelize.transaction();

    try {
      let hasChanges = false;
      const userDataCopy = { ...userData };

      if (
        userDataCopy.password &&
        (await user.comparePassword(userDataCopy.password))
      ) {
        delete userDataCopy.password;
      }

      (Object.keys(userDataCopy) as Array<keyof UserInterface>).forEach(
        (key) => {
          const newValue = userDataCopy[key];
          const currentValue = user.get(key);

          if (newValue !== undefined && newValue !== currentValue) {
            user.set(key, newValue);
            hasChanges = true;
          }
        }
      );

      if (!hasChanges) {
        await transaction.rollback();
        return "Tudo está como antes, nada para atualizar";
      }

      await user.save({ transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw new Error(
        `Erro ao atualizar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async delete(user: User) {
    try {
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(
        `Erro ao deletar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async deleteAll() {
    const transaction = await sequelize.transaction();

    try {
      const result = await this.userModel.destroy({
        where: {},
        truncate: true,
        transaction,
      });

      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw new Error(
        `Erro ao deletar todos os usuários: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

export default new UserRepository();
