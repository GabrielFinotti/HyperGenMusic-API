import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database/databaseConfig";
import Playlist from "./Playlist";
import Music from "./Music";

interface PlaylistMusicsAttributes {
  playlistId: number;
  musicId: number;
  position: number;
  addedAt: Date;
}

class PlaylistMusics
  extends Model<PlaylistMusicsAttributes>
  implements PlaylistMusicsAttributes
{
  declare playlistId: number;
  declare musicId: number;
  declare position: number;
  declare addedAt: Date;
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
    addedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
