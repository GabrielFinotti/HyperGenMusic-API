import { Playlist } from "../../models";
import { PlaylistData } from "../interfaces";

export interface IPlaylistRepository {
  getPlaylistsByUserId(userId: number): Promise<Playlist[]>;
  createPlaylist(playlistData: PlaylistData): Promise<Playlist>;
  updatePlaylist(
    playlistId: number,
    playlistData: PlaylistData
  ): Promise<Playlist>;
  deletePlaylist(playlistId: number): Promise<boolean>;
}
