import User from "./User";
import Music from "./Music";
import Playlist from "./Playlist";
import PlaylistMusics from "./PlaylistMusics";
import LikedMusics from "./LikedMusics";

// Relacionamento User -> Playlist (1:N)
User.hasMany(Playlist, {
  foreignKey: "userId",
  as: "playlists",
});

// Relacionamento Playlist -> User (N:1)
Playlist.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Relacionamento User <-> Music (N:M via LikedMusics)
User.belongsToMany(Music, {
  through: LikedMusics,
  foreignKey: "userId",
  otherKey: "musicId",
  as: "likedMusics",
  timestamps: false,
});

// Relacionamento Music <-> User (N:M via LikedMusics)
Music.belongsToMany(User, {
  through: LikedMusics,
  foreignKey: "musicId",
  otherKey: "userId",
  as: "likedByUsers",
  timestamps: false,
});

// Relacionamento Playlist <-> Music (N:M via PlaylistMusics)
Playlist.belongsToMany(Music, {
  through: PlaylistMusics,
  foreignKey: "playlistId",
  otherKey: "musicId",
  as: "musics",
  timestamps: false,
});

// Relacionamento Music <-> Playlist (N:M via PlaylistMusics)
Music.belongsToMany(Playlist, {
  through: PlaylistMusics,
  foreignKey: "musicId",
  otherKey: "playlistId",
  as: "playlistsOfMusic",
  timestamps: false,
});

export { User, Music, Playlist, PlaylistMusics, LikedMusics };
