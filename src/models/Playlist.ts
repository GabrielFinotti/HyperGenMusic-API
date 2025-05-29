import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/postgre_config";
import Music from "./Music";
import { PlaylistAttributes } from "../types";

interface PlaylistCreationAttributes
  extends Optional<PlaylistAttributes, "id"> {}

class Playlist
  extends Model<PlaylistAttributes, PlaylistCreationAttributes>
  implements PlaylistAttributes
{
  declare id: number;

  declare userId: number;

  declare name: string;

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
