/**
 * Modelo de Música - HyperMusic API v2.0
 *
 * Define o modelo Sequelize para a entidade Music, representando
 * músicas no catálogo da plataforma com todos os metadados,
 * relacionamentos e validações necessárias.
 *
 * Funcionalidades:
 * - Estrutura completa de dados musicais
 * - Relacionamentos many-to-many com User (curtidas)
 * - Relacionamentos many-to-many com Playlist
 * - Validações de URL e dados obrigatórios
 * - Índices otimizados para busca
 * - Timestamps automáticos
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/postgre_config";
import Playlist from "./Playlist";
import User from "./User";
import { MusicAttributes } from "../types";

interface MusicCreationAttributes extends Optional<MusicAttributes, "id"> {}

/**
 * Modelo de Música do Sistema
 *
 * Representa uma música no catálogo do HyperMusic, incluindo
 * metadados como título, artista, duração e URLs para arquivos.
 *
 * Relacionamentos:
 * - Pertence a múltiplas Playlists (many-to-many)
 * - Pode ser curtida por múltiplos Users (many-to-many)
 *
 * @example
 * ```typescript
 * const music = await Music.create({
 *   title: "Song Title",
 *   artist: "Artist Name",
 *   genre: "Rock",
 *   duration: 180, // em segundos
 *   songUrl: "https://storage.com/song.mp3",
 *   imageUrl: "https://storage.com/cover.jpg"
 * });
 * ```
 */
class Music
  extends Model<MusicAttributes, MusicCreationAttributes>
  implements MusicAttributes
{
  /** ID único da música */
  declare id: number;

  /** Título da música */
  declare title: string;

  /** Nome do artista/banda */
  declare artist: string;

  /** Gênero musical (opcional) */
  declare genre?: string;

  /** URL da imagem de capa (opcional) */
  declare imageUrl?: string;

  /** Duração da música em segundos */
  declare duration: number;

  /** URL do arquivo de áudio */
  declare songUrl: string;

  // Relacionamentos (populados via includes)
  /** Playlists que contêm esta música */
  declare playlists?: Playlist[];

  /** Usuários que curtiram esta música */
  declare likedByUsers?: User[];
}

Music.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 1,
      },
    },
    songUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "musics",
    timestamps: true,
    indexes: [
      { fields: ["title"] },
      { fields: ["artist"] },
      { fields: ["genre"] },
    ],
  }
);

export default Music;
