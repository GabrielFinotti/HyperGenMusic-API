/**
 * Exportação Centralizada dos Controllers de Playlist - HyperMusic API v2.0
 *
 * Concentra todas as exportações dos controllers relacionados ao
 * gerenciamento de playlists para facilitar importações e organização.
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */

import addMusicToPlaylist from "./add_music_to_playlist";
import createPlaylist from "./create_playlist";
import deletePlaylist from "./delete_playlist";
import getMusicPlaylist from "./get_music_playlist";
import getPlaylistUser from "./get_playlist_user";
import removeMusicFromPlaylist from "./remove_music_from_playlist";
import updateMusicPosition from "./update_music_position";
import updatePlaylist from "./update_playlist";

export {
  addMusicToPlaylist,
  createPlaylist,
  deletePlaylist,
  getMusicPlaylist,
  getPlaylistUser,
  removeMusicFromPlaylist,
  updateMusicPosition,
  updatePlaylist,
};
