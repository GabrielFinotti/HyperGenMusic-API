import { Op } from "sequelize";
import User from "../models/userModel";
import { IUserRepository, UserInterface } from "../types";
import sequelize from "../config/database/databaseConfig";

class UserRepository implements IUserRepository {
  constructor(private userModel = User) {}

  async findById(userId: number, includePassword = false) {
    try {
      return await this.userModel.findByPk(userId, {
        attributes: includePassword ? undefined : { include: ["password"] },
      });
    } catch (error) {
      throw new Error("Erro ao encontrar usuário por ID.");
    }
  }

  async findByEmail(email: string, includePassword = false) {
    try {
      return await this.userModel.findOne({
        where: { email },
        attributes: includePassword ? undefined : { include: ["password"] },
      });
    } catch (error) {
      throw new Error("Erro ao encontrar usuário por email.");
    }
  }

  async findByUsername(username: string, includePassword = false) {
    try {
      return await this.userModel.findOne({
        where: { username },
        attributes: includePassword ? undefined : { include: ["password"] },
      });
    } catch (error) {
      throw new Error("Erro ao encontrar usuário por username.");
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
        attributes: includePassword ? undefined : { include: ["password"] },
      });
    } catch (error) {
      throw new Error("Erro ao encontrar usuário por username ou email.");
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
      throw new Error("Erro ao encontrar usuários por termos.");
    }
  }

  async findAll(limit = 10, offset = 0) {
    try {
      return await this.userModel.findAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error("Erro ao encontrar todos os usuários.");
    }
  }

  async create(userData: UserInterface) {
    try {
      return await this.userModel.create(userData);
    } catch (error) {
      throw new Error("Erro ao criar usuário.");
    }
  }

  async update(user: User, userData: Partial<UserInterface>) {
    const transaction = await sequelize.transaction();

    try {
      let hasChanges = false;

      (Object.keys(userData) as Array<keyof UserInterface>).forEach((key) => {
        const newValue = userData[key];
        const currentValue = user.get(key);

        if (newValue !== undefined && newValue !== currentValue) {
          user.set(key, newValue);

          hasChanges = true;
        }
      });

      if (!hasChanges) {
        await transaction.rollback();

        return "Tudo está como antes, nada para atualizar";
      }

      await user.save({ transaction });

      await transaction.commit();

      return user;
    } catch (error) {
      await transaction.rollback();

      throw new Error("Erro ao atualizar usuário.");
    }
  }

  async delete(user: User) {
    try {
      await user.destroy();

      return true;
    } catch (error) {
      throw new Error("Erro ao deletar usuário.");
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

      throw new Error("Erro ao deletar todos os usuários.");
    }
  }
}

export default new UserRepository();
