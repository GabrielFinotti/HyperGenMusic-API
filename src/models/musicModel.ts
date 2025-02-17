import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/databaseConfig";

interface SongAttributes {
  id: number;
  title: string;
  songUrl: string;
  totalTimesPlayed: number;
  imageUrl?: string;
  artist?: string;
  genre?: string;
}

interface SongCreationAttributes
  extends Optional<SongAttributes, "id" | "totalTimesPlayed"> {}

class Music
  extends Model<SongAttributes, SongCreationAttributes>
  implements SongAttributes
{
  public id!: number;
  public title!: string;
  public songUrl!: string;
  public totalTimesPlayed!: number;
  public imageUrl?: string;
  public artist?: string;
  public genre?: string;
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
    },
    songUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalTimesPlayed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "musics",
    timestamps: true,
  }
);

export default Music;
