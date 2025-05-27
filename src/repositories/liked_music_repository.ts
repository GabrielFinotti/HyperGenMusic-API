/**
 * Repositório de Músicas Curtidas - HyperGenMusic API v2.0
 *
 * Implementa o padrão Repository para operações de acesso a dados
 * relacionadas ao modelo LikedMusics. Gerencia o relacionamento
 * many-to-many entre usuários e suas músicas favoritas.
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { LikedMusics, Music, User } from "../models";
import { ILikedMusicRepository } from "../types";
import { LikedMusicData } from "../types";

/**
 * Implementação do repositório de músicas curtidas
 *
 * Gerencia todas as operações de acesso a dados para o sistema
 * de curtidas, incluindo adicionar/remover curtidas e consultas.
 *
 * @class LikedMusicRepository
 * @implements {ILikedMusicRepository}
 */
class LikedMusicRepository implements ILikedMusicRepository {
  /**
   * Adiciona uma música às favoritas do usuário
   * @param data - Dados da associação usuário-música
   * @returns Registro de curtida criado
   * @throws Erro do banco de dados ou violação de constraints
   */
  async likeMusic(data: LikedMusicData) {
    try {
      const likedMusic = await LikedMusics.create(data);

      return likedMusic;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove uma música das favoritas do usuário
   * @param data - Dados da associação usuário-música
   * @returns true se removido com sucesso, false se não encontrado
   * @throws Erro do banco de dados
   */
  async unlikeMusic(data: LikedMusicData) {
    try {
      const result = await LikedMusics.destroy({
        where: { userId: data.userId, musicId: data.musicId },
      });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Recupera todas as músicas curtidas por um usuário
   * Utiliza relacionamento Sequelize para buscar através da associação
   * @param userId - ID do usuário
   * @returns Array de músicas curtidas ou null se vazio
   * @throws Erro do banco de dados
   */
  async getLikedMusicsByUserId(userId: number) {
    try {
      const likedMusics = await User.findByPk(userId, {
        include: [
          {
            model: Music,
            as: "likedMusics",
          },
        ],
        attributes: [],
      });

      return likedMusics?.likedMusics ? likedMusics.likedMusics : null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verifica se um usuário já curtiu uma música específica
   * @param data - Dados da associação usuário-música
   * @returns true se já curtiu, false caso contrário
   * @throws Erro do banco de dados
   */
  async checkIfUserLikedMusic(data: LikedMusicData) {
    try {
      const likedMusic = await LikedMusics.findOne({
        where: { userId: data.userId, musicId: data.musicId },
      });

      return likedMusic !== null;
    } catch (error) {
      throw error;
    }
  }
}

export default new LikedMusicRepository();
