/**
 * Interface do Serviço de Músicas Curtidas - HyperGenMusic API v2.0
 *
 * Define o contrato para a camada de lógica de negócio relacionada
 * ao sistema de curtidas/favoritos, incluindo operações de curtir,
 * descurtir e consultas de músicas favoritas dos usuários.
 *
 * Métodos definidos:
 * - getLikedMusicsByUserId: Retorna Music[] (corrigido de LikedMusicData[])
 * - checkIfUserLikedMusic: Verifica status de curtida
 * - likeMusic: Adiciona aos favoritos
 * - unlikeMusic: Remove dos favoritos
 *
 * @interface LikedMusicService
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Music } from "../../models";
import { LikedMusicData, ResponseError, ResponseSuccess } from "../interfaces";

/**
 * Contrato para serviços de músicas curtidas
 *
 * Define o contrato para todas as operações de negócio envolvendo o sistema
 * de curtidas, incluindo gerenciamento de favoritos e consultas relacionadas.
 */
export interface LikedMusicService {  /**
   * Recupera todas as músicas curtidas por um usuário específico
   *
   * @param userId - ID único do usuário
   * @returns Promise com array de objetos Music (dados completos das músicas) ou erro
   */
  getLikedMusicsByUserId(
    userId: number
  ): Promise<ResponseError | ResponseSuccess<Music[]>>;

  /**
   * Verifica se um usuário já curtiu uma música específica
   *
   * @param likedMusicData - Dados da associação usuário-música
   * @returns Promise com status boolean (true se curtida) ou erro
   */
  checkIfUserLikedMusic(
    likedMusicData: LikedMusicData
  ): Promise<ResponseError | ResponseSuccess<boolean>>;

  /**
   * Adiciona uma música às favoritas do usuário
   *
   * @param likedMusicData - Dados da associação usuário-música
   * @returns Promise com confirmação de operação ou erro
   */
  likeMusic(
    likedMusicData: LikedMusicData
  ): Promise<ResponseError | ResponseSuccess<boolean>>;

  /**
   * Remove uma música das favoritas do usuário
   *
   * @param likedMusicData - Dados da associação usuário-música
   * @returns Promise com confirmação de operação ou erro
   */
  unlikeMusic(
    likedMusicData: LikedMusicData
  ): Promise<ResponseError | ResponseSuccess<boolean>>;
}
