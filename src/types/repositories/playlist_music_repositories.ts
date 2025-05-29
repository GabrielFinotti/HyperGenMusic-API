import { PlaylistMusics } from "../../models";
import { PlaylistMusicData } from "../interfaces";

export interface IPlaylistMusicRepository {
  getMusicsByPlaylistId(playlistId: number): Promise<PlaylistMusics[]>;

  addMusicToPlaylist(data: PlaylistMusicData): Promise<PlaylistMusics>;

  updateMusicPosition(playlistMusicData: PlaylistMusicData): Promise<boolean>;

  removeMusicFromPlaylist(
    playlistMusicData: PlaylistMusicData
  ): Promise<boolean>;
}
