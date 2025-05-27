/**
 * Repositório de Música - HyperGenMusic API v2.0
 *
 * Implementa o padrão Repository para operações de acesso a dados
 * relacionadas ao modelo Music. Fornece uma camada de abstração
 * sobre o Sequelize ORM para operações CRUD.
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Op } from "sequelize";
import { Music } from "../models";
import { IMusicRepository, MusicAttributes } from "../types";

/**
 * Implementação do repositório de músicas
 *
 * Gerencia todas as operações de acesso a dados para músicas,
 * incluindo consultas complexas, paginação e transações.
 *
 * @class MusicRepository
 * @implements {IMusicRepository}
 */
class MusicRepository implements IMusicRepository {
  /**
   * Recupera todas as músicas com paginação
   * @param limit - Número máximo de registros por página (padrão: 10)
   * @param offset - Número de registros a pular (padrão: 0)
   * @returns Array de músicas ou null se vazio
   * @throws Erro do banco de dados
   */
  async getAllMusics(limit: number = 10, offset: number = 0) {
    try {
      const musics = await Music.findAll({
        limit,
        offset,
      });

      return musics.length > 0 ? musics : null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca uma música por ID único
   * @param musicId - ID da música a ser buscada
   * @returns Música encontrada ou null
   * @throws Erro do banco de dados
   */
  async getMusicById(musicId: number) {
    try {
      const music = await Music.findByPk(musicId);

      return music ?? null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca músicas por termo de pesquisa
   * Pesquisa em título, artista e gênero usando LIKE
   * @param term - Termo de busca
   * @param limit - Número máximo de resultados (padrão: 10)
   * @param offset - Número de resultados a pular (padrão: 0)
   * @returns Músicas que correspondem ao termo ou null
   * @throws Erro do banco de dados
   */
  async getMusicByTerm(term: string, limit: number = 10, offset: number = 0) {
    try {
      const whereClause = {
        [Op.or]: [
          { title: { [Op.like]: `%${term}%` } },
          { artist: { [Op.like]: `%${term}%` } },
          { genre: { [Op.like]: `%${term}%` } },
        ],
      };

      const musics = await Music.findAll({
        where: whereClause,
        limit,
        offset,
      });

      return musics.length > 0 ? musics : null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Filtra músicas por gênero específico
   * @param genre - Gênero musical para filtrar
   * @param limit - Número máximo de resultados (padrão: 10)
   * @param offset - Número de resultados a pular (padrão: 0)
   * @returns Músicas do gênero especificado ou null
   * @throws Erro do banco de dados
   */
  async getMusicByGenre(genre: string, limit: number = 10, offset: number = 0) {
    try {
      const musics = await Music.findAll({
        where: { genre },
        limit,
        offset,
      });

      return musics.length > 0 ? musics : null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cria uma nova música no banco
   * @param music - Dados parciais da música a ser criada
   * @throws Erro de validação ou banco de dados
   */
  async createMusic(music: Partial<MusicAttributes>) {
    try {
      await Music.create(music as MusicAttributes);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Atualiza uma música existente com transação
   * @param musicId - ID da música a ser atualizada
   * @param data - Novos dados da música
   * @returns Música atualizada
   * @throws Erro do banco de dados (rollback automático)
   */
  async updateMusic(musicId: number, data: Partial<MusicAttributes>) {
    try {
      const transaction = await Music.sequelize?.transaction();
      const music = (await Music.findByPk(musicId)) as Music;

      try {
        await music.update(data, { transaction });

        await transaction?.commit();

        return music;
      } catch (error) {
        await transaction?.rollback();

        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove uma música específica do banco
   * @param musicId - ID da música a ser removida
   * @throws Erro do banco de dados
   */
  async deleteMusic(musicId: number) {
    try {
      await Music.destroy({
        where: { id: musicId },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove todas as músicas do banco com transação
   * ⚠️ OPERAÇÃO DESTRUTIVA - Use com extrema cautela
   * @returns Número de registros removidos
   * @throws Erro do banco de dados (rollback automático)
   */
  async deleteAllMusic() {
    try {
      const transaction = await Music.sequelize?.transaction();

      try {
        const result = await Music.destroy({
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

export default new MusicRepository();
