/**
 * Interface do Repositório de Músicas Curtidas - HyperGenMusic API v2.0
 *
 * Define o contrato para operações de acesso a dados relacionadas
 * ao modelo LikedMusics, estabelecendo métodos para gerenciamento
 * do sistema de curtidas entre usuários e músicas.
 *
 * @interface ILikedMusicRepository
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { LikedMusics, Music } from "../../models";
import { LikedMusicData } from "../interfaces";

/**
 * Contrato para repositório de músicas curtidas
 * 
 * Define operações de acesso a dados para o sistema de "curtir músicas",
 * gerenciando a relação many-to-many entre usuários e suas músicas favoritas.
 */
export interface ILikedMusicRepository {
  /**
   * Registra que um usuário curtiu uma música
   *
   * @param data - Dados contendo userId e musicId
   * @returns Promise com registro de curtida criado
   * @throws Error se a curtida já existir
   */
  likeMusic(data: LikedMusicData): Promise<LikedMusics>;

  /**
   * Remove a curtida de um usuário em uma música
   *
   * @param data - Dados contendo userId e musicId
   * @returns Promise com true se removido com sucesso
   */
  unlikeMusic(data: LikedMusicData): Promise<boolean>;

  /**
   * Recupera todas as músicas curtidas por um usuário
   *
   * @param userId - ID do usuário
   * @returns Promise com array de músicas curtidas ou null se nenhuma
   */
  getLikedMusicsByUserId(userId: number): Promise<Music[] | null>;

  /**
   * Verifica se um usuário já curtiu uma música específica
   *
   * @param data - Dados contendo userId e musicId
   * @returns Promise com true se já curtiu, false caso contrário
   */
  checkIfUserLikedMusic(data: LikedMusicData): Promise<boolean>;
}
