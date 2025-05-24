import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database/postgre_config";
import { PlaylistMusicsAttributes } from "../types";

class PlaylistMusics
  extends Model<PlaylistMusicsAttributes>
  implements PlaylistMusicsAttributes
{
  declare playlistId: number;
  declare musicId: number;
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
