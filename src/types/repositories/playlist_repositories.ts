export interface IPlaylistRepository {
  getAllPlaylists(): Promise<any>;
  getPlaylistById(playlistId: number): Promise<any>;
  getPlaylistsByUserId(userId: number): Promise<any>;
  createPlaylist(playlistData: any): Promise<any>;
  updatePlaylist(playlistId: number, playlistData: any): Promise<any>;
  deletePlaylist(playlistId: number): Promise<any>;
}
