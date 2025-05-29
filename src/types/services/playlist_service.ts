import { Playlist, PlaylistMusics } from "../../models";
import {
  PlaylistData,
  PlaylistMusicData,
  ResponseError,
  ResponseSuccess,
} from "../interfaces";

export interface PlaylistService {
  getPlaylistByUserId(
    userId: number
  ): Promise<ResponseError | ResponseSuccess<Playlist[]>>;

  createPlaylist(
    playlistData: PlaylistData
  ): Promise<ResponseError | ResponseSuccess<Playlist>>;

  updatePlaylist(
    playlistId: number,
    playlistData: Partial<PlaylistData>
  ): Promise<ResponseError | ResponseSuccess<Playlist>>;

  deletePlaylist(
    playlistId: number
  ): Promise<ResponseError | ResponseSuccess<boolean>>;

  getMusicsByPlaylistId(
    playlistId: number
  ): Promise<ResponseError | ResponseSuccess<PlaylistMusics[]>>;

  addMusicToPlaylist(
    playlistMusicData: PlaylistMusicData
  ): Promise<ResponseError | ResponseSuccess<PlaylistMusics>>;

  updateMusicPosition(
    playlistMusicData: PlaylistMusicData
  ): Promise<ResponseError | ResponseSuccess<boolean>>;

  removeMusicFromPlaylist(
    playlistMusicData: PlaylistMusicData
  ): Promise<ResponseError | ResponseSuccess<boolean>>;
}
