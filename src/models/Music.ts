import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database/databaseConfig";
import Playlist from "./Playlist";
import PlaylistMusics from "./PlaylistMusics";
import User from "./User"; 
import LikedMusics from "./LikedMusics"; 

interface MusicAttributes {
  id: number;
  title: string;
  artist: string;
  genre?: string;
  imageUrl?: string; 
  duration: number;
  songUrl: string;
}

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

Music.belongsToMany(Playlist, {
  through: PlaylistMusics, 
  foreignKey: "musicId", 
  otherKey: "playlistId", 
  as: "playlists", 
  timestamps: false,
});

Music.belongsToMany(User, {
  through: LikedMusics, 
  foreignKey: "musicId", 
  otherKey: "userId", 
  as: "likedByUsers", 
  timestamps: false,
});

export default Music;
