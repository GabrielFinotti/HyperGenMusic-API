/**
 * Modelo de Relacionamento Playlist-Música - HyperMusic API v2.0
 *
 * Define o modelo Sequelize para a tabela de junção entre Playlist e
 * Music, controlando a associação many-to-many com informações
 * adicionais como posição e ordem das músicas.
 *
 * Funcionalidades:
 * - Relacionamento many-to-many Playlist ↔ Music
 * - Controle de posição das músicas na playlist
 * - Timestamps de adição de músicas
 * - Chave composta (playlistId + musicId)
 * - Validações de integridade referencial
 * - Índices otimizados para consultas
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database/postgre_config";
import { PlaylistMusicsAttributes } from "../types";

/**
 * Modelo de associação entre Playlists e Músicas
 *
 * Representa a tabela de junção que controla quais músicas pertencem a quais playlists,
 * incluindo a posição/ordem da música dentro da playlist.
 *
 * @example
 * ```typescript
 * // Adicionar música na posição 3 da playlist
 * const playlistMusic = await PlaylistMusics.create({
 *   playlistId: 1,
 *   musicId: 5,
 *   position: 3
 * });
 * ```
 */
class PlaylistMusics
  extends Model<PlaylistMusicsAttributes>
  implements PlaylistMusicsAttributes
{
  /** ID da playlist proprietária */
  declare playlistId: number;

  /** ID da música associada */
  declare musicId: number;

  /** Posição/ordem da música dentro da playlist (1, 2, 3...) */
  declare position: number;
}

PlaylistMusics.init(
  {
    playlistId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "playlists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    musicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "musics",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "playlist_musics",
    timestamps: false,
    indexes: [
      { fields: ["playlistId"] },
      { fields: ["musicId"] },
      { fields: ["playlistId", "position"] },
    ],
  }
);

export default PlaylistMusics;
