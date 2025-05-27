/**
 * Repositório de Usuário - HyperGenMusic API v2.0
 *
 * Implementa o padrão Repository para operações de acesso a dados
 * relacionadas ao modelo User. Fornece uma camada de abstração
 * sobre o Sequelize ORM para operações CRUD e consultas especializadas.
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Op, WhereOptions } from "sequelize";
import { User } from "../models";
import { IUserRepository, UserAttributes } from "../types";

/**
 * Implementação do repositório de usuários
 *
 * Gerencia todas as operações de acesso a dados para usuários,
 * incluindo consultas com e sem senha, busca por termo e transações.
 *
 * @class UserRepository
 * @implements {IUserRepository}
 */
class UserRepository implements IUserRepository {
  /**
   * Recupera todos os usuários com paginação
   * @param limit - Número máximo de registros por página (padrão: 10)
   * @param offset - Número de registros a pular (padrão: 0)
   * @returns Array de usuários ou null se vazio
   * @throws Erro do banco de dados
   */
  async getAllUsers(limit: number = 10, offset: number = 0) {
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

  /**
   * Busca um usuário por ID único
   * @param userId - ID do usuário a ser buscado
   * @returns Usuário encontrado ou null
   * @throws Erro do banco de dados
   */
  async getUserById(userId: number) {
    try {
      const user = await User.findByPk(userId);

      return user ?? null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca um usuário por email
   * @param email - Email do usuário
   * @returns Usuário encontrado ou null
   * @throws Erro do banco de dados
   */
  async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });

      return user ?? null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca usuário incluindo o campo senha (para autenticação)
   * @param email - Email do usuário (opcional)
   * @param userId - ID do usuário (opcional)
   * @returns Usuário com senha incluída ou null
   * @throws Erro do banco de dados
   */
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

  /**
   * Busca usuários por termo de pesquisa
   * Pesquisa em username e email usando LIKE
   * @param term - Termo de busca
   * @param limit - Número máximo de resultados (padrão: 10)
   * @param offset - Número de resultados a pular (padrão: 0)
   * @returns Usuários que correspondem ao termo ou null
   * @throws Erro do banco de dados
   */
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

  /**
   * Cria um novo usuário no banco
   * @param data - Dados parciais do usuário a ser criado
   * @throws Erro de validação ou banco de dados
   */
  async createUser(data: Partial<UserAttributes>) {
    try {
      await User.create(data as UserAttributes);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Atualiza um usuário existente com transação
   * @param userId - ID do usuário a ser atualizado
   * @param data - Novos dados do usuário
   * @returns Usuário atualizado
   * @throws Erro do banco de dados (rollback automático)
   */
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

  /**
   * Remove um usuário específico do banco
   * @param userId - ID do usuário a ser removido
   * @throws Erro do banco de dados
   */
  async deleteUser(userId: number) {
    try {
      await User.destroy({ where: { id: userId } });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove todos os usuários do banco com transação
   * ⚠️ OPERAÇÃO DESTRUTIVA - Use com extrema cautela
   * @returns Número de registros removidos
   * @throws Erro do banco de dados (rollback automático)
   */
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
