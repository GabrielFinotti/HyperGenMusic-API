import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/databaseConfig";

interface SongAttributes {
  id: number;
  title: string;
  songUrl: string;
  duration: number;
  imageUrl?: string;
  artist?: string;
  genre?: string;
}

interface SongCreationAttributes extends Optional<SongAttributes, "id"> {}

class Music
  extends Model<SongAttributes, SongCreationAttributes>
  implements SongAttributes
{
  declare id: number;
  declare title: string;
  declare songUrl: string;
  declare duration: number;
  declare imageUrl?: string;
  declare artist?: string;
  declare genre?: string;

  public getFormattedDuration(): string {
    const hours = Math.floor(this.duration / 3600);
    const minutes = Math.floor((this.duration % 3600) / 60);
    const seconds = this.duration % 60;

    return [
      hours > 0 ? String(hours).padStart(2, "0") : null,
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ]
      .filter(Boolean)
      .join(":");
  }
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
      validate: {
        isUrl: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
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
    indexes: [
      {
        unique: true,
        fields: ["title"],
      },
      { fields: ["artist"] },
      { fields: ["genre"] },
    ],
  }
);

export default Music;
