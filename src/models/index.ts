import User from "./User";
import Music from "./Music";
import Playlist from "./Playlist";
import PlaylistMusics from "./PlaylistMusics";
import LikedMusics from "./LikedMusics";

User.hasMany(Playlist, {
  foreignKey: "userId",
  as: "playlists",
});

Playlist.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.belongsToMany(Music, {
  through: LikedMusics,
  foreignKey: "userId",
  otherKey: "musicId",
  as: "likedMusics",
  timestamps: false,
});

Music.belongsToMany(User, {
  through: LikedMusics,
  foreignKey: "musicId",
  otherKey: "userId",
  as: "likedByUsers",
  timestamps: false,
});

Playlist.belongsToMany(Music, {
  through: PlaylistMusics,
  foreignKey: "playlistId",
  otherKey: "musicId",
  as: "musics",
  timestamps: false,
});

Music.belongsToMany(Playlist, {
  through: PlaylistMusics,
  foreignKey: "musicId",
  otherKey: "playlistId",
  as: "playlistsOfMusic",
  timestamps: false,
});

export { User, Music, Playlist, PlaylistMusics, LikedMusics };
