/**
 * Modelo de Usuário do Sistema
 *
 * Representa um usuário no HyperGenMusic, incluindo dados pessoais,
 * credenciais de acesso e relacionamentos com músicas e playlists.
 *
 * Relacionamentos:
 * - Possui múltiplas Playlists (one-to-many)
 * - Curte múltiplas Músicas (many-to-many via LikedMusics)
 *
 * Roles disponíveis:
 * - user: Usuário padrão
 * - admin: Administrador da plataforma
 * - dev: Desenvolvedor (acesso total)
 *
 * @example
 * ```typescript
 * const user = await User.create({
 *   username: "johndoe",
 *   email: "john@example.com",
 *   password: "hashedPassword",
 *   role: "user"
 * });
 * ```
 */
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/postgre_config";
import Music from "./Music";
import Playlist from "./Playlist";
import { UserAttributes } from "../types";

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

/**
 * Classe do modelo User com atributos e relacionamentos
 */
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  /** ID único do usuário */
  declare id: number;

  /** Nome de usuário único */
  declare username: string;

  /** Email único do usuário */
  declare email: string;

  /** Senha hash (bcrypt) */
  declare password: string;

  /** URL da imagem de perfil (opcional) */
  declare imageUrl?: string;

  /** Número de telefone (opcional) */
  declare phone?: string;

  /** Role do usuário no sistema */
  declare role: "user" | "admin" | "dev";

  /** Último token JWT emitido */
  declare lastToken?: string;

  /** Músicas curtidas pelo usuário */
  declare likedMusics?: Music[];

  /** Playlists criadas pelo usuário */
  declare playlists?: Playlist[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 12],
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [11, 11],
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "dev"),
      allowNull: false,
      defaultValue: "user",
    },
    lastToken: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    indexes: [
      {
        fields: ["username"],
      },
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

export default User;
