/**
 * Agregador de Modelos e Relacionamentos - HyperGenMusic API v2.0
 *
 * Centraliza todos os modelos Sequelize e define os relacionamentos
 * entre as entidades do sistema.
 *
 * Modelos incluídos:
 * - User: Usuários do sistema
 * - Music: Catálogo de músicas
 * - Playlist: Playlists de usuários
 * - PlaylistMusics: Tabela de junção playlist-música
 * - LikedMusics: Tabela de junção usuário-música (curtidas)
 *
 * Relacionamentos definidos:
 * - User 1:N Playlist
 * - User N:M Music (via LikedMusics)
 * - Playlist N:M Music (via PlaylistMusics)
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
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
