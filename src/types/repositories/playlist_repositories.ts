import { Playlist } from "../../models";
import { PlaylistData } from "../interfaces";

export interface IPlaylistRepository {
  getPlaylistsByUserId(userId: number): Promise<Playlist[]>;

  getPlaylistById(playlistId: number): Promise<Playlist | null>;

  createPlaylist(playlistData: PlaylistData): Promise<Playlist>;

  updatePlaylist(
    playlistId: number,
    playlistData: Partial<PlaylistData>
  ): Promise<Playlist>;

  deletePlaylist(playlistId: number): Promise<boolean>;
}
