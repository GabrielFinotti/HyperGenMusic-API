import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database/database_config";
import Playlist from "./Playlist";
import Music from "./Music";
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
        model: Playlist,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    musicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Music,
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
