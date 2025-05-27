/**
 * Modelo de Playlist do Sistema
 *
 * Representa uma playlist criada por um usuário, contendo
 * uma coleção organizada de músicas.
 *
 * Relacionamentos:
 * - Pertence a um User (many-to-one)
 * - Contém múltiplas Músicas (many-to-many via PlaylistMusics)
 *
 * @example
 * ```typescript
 * const playlist = await Playlist.create({
 *   userId: 1,
 *   name: "Minha Playlist Favorita"
 * });
 * ```
 */
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/postgre_config";
import Music from "./Music";
import { PlaylistAttributes } from "../types";

interface PlaylistCreationAttributes
  extends Optional<PlaylistAttributes, "id"> {}

/**
 * Classe do modelo Playlist com atributos e relacionamentos
 */
class Playlist
  extends Model<PlaylistAttributes, PlaylistCreationAttributes>
  implements PlaylistAttributes
{
  /** ID único da playlist */
  declare id: number;

  /** ID do usuário proprietário */
  declare userId: number;

  /** Nome da playlist */
  declare name: string;

  /** Músicas da playlist */
  declare musics?: Music[];
}

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "playlists",
    timestamps: true,
    indexes: [
      {
        fields: ["userId"],
      },
    ],
  }
);

export default Playlist;
