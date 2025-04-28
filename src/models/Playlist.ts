import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/databaseConfig";
import User from "./User";
import Music from "./Music";
import PlaylistMusics from "./PlaylistMusics";

interface PlaylistAttributes {
  id: number;
  userId: number;
  name: string;
  description?: string;
}

interface PlaylistCreationAttributes
  extends Optional<PlaylistAttributes, "id"> {}

class Playlist
  extends Model<PlaylistAttributes, PlaylistCreationAttributes>
  implements PlaylistAttributes
{
  declare id: number;
  declare userId: number;
  declare name: string;
  declare description?: string;

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
        model: User,
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: 100,
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

Playlist.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Playlist, {
  foreignKey: "userId",
  as: "playlists",
});

Playlist.belongsToMany(Music, {
  through: PlaylistMusics,
  foreignKey: "playlistId",
  otherKey: "musicId",
  as: "musics",
  timestamps: false,
});

export default Playlist;
