import { Op } from "sequelize";
import User from "../models/userModel";
import { IUserRepository, UserInterface } from "../types";
import sequelize from "../config/database/databaseConfig";

class UserRepository implements IUserRepository {
  constructor(private userModel = User) {}

  async findById(userId: number) {
    try {
      return await this.userModel.findByPk(userId);
    } catch (error) {
      console.error(
        `Erro ao encontrar usuário por ID: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao encontrar usuário por ID.");
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({
        where: { email },
      });
    } catch (error) {
      console.error(
        `Erro ao encontrar usuário por email: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao encontrar usuário por email.");
    }
  }

  async findByUsername(username: string) {
    try {
      return await this.userModel.findOne({
        where: { username },
      });
    } catch (error) {
      console.error(
        `Erro ao encontrar usuário por username: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao encontrar usuário por username.");
    }
  }

  async findByUsernameOrEmail(username: string, email: string) {
    try {
      return await this.userModel.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
    } catch (error) {
      console.error(
        `Erro ao encontrar usuário por username ou email: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

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
      console.error(
        `Erro ao encontrar usuários por termos: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

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
      console.error(
        `Erro ao encontrar todos os usuários: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao encontrar todos os usuários.");
    }
  }

  async create(userData: UserInterface) {
    try {
      return await this.userModel.create(userData);
    } catch (error) {
      console.error(
        `Erro ao criar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

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
      console.error(
        `Erro ao atualizar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      await transaction.rollback();

      throw new Error("Erro ao atualizar usuário.");
    }
  }

  async delete(user: User) {
    try {
      await user.destroy();

      return true;
    } catch (error) {
      console.error(
        `Erro ao deletar usuário: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

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
      console.error(
        `Erro ao deletar todos os usuários: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      await transaction.rollback();

      throw new Error("Erro ao deletar todos os usuários.");
    }
  }
}

export default new UserRepository();
