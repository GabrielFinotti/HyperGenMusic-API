import { PlaylistMusics } from "../../models";
import { PlaylistMusicData } from "../interfaces";

export interface IPlaylistMusicRepository {
  addMusicToPlaylist(data: PlaylistMusicData): Promise<PlaylistMusics>;
  removeMusicFromPlaylist(
    playlistId: number,
    musicId: number
  ): Promise<boolean>;
  getMusicsByPlaylistId(playlistId: number): Promise<PlaylistMusics[]>;
  updateMusicPosition(
    playlistId: number,
    musicId: number,
    newPosition: number
  ): Promise<boolean>;
}
