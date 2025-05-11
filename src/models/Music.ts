import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/postgre_config";
import Playlist from "./Playlist";
import User from "./User";
import { MusicAttributes } from "../types";

interface MusicCreationAttributes extends Optional<MusicAttributes, "id"> {}

class Music
  extends Model<MusicAttributes, MusicCreationAttributes>
  implements MusicAttributes
{
  declare id: number;
  declare title: string;
  declare artist: string;
  declare genre?: string;
  declare imageUrl?: string;
  declare duration: number;
  declare songUrl: string;

  declare playlists?: Playlist[];
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
