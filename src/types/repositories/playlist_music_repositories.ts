export interface IPlaylistMusicRepository {
  addMusicToPlaylist(data: any): Promise<any>;
  removeMusicFromPlaylist(playlistId: number, musicId: number): Promise<any>;
  getMusicsByPlaylistId(playlistId: number): Promise<any>;
  updateMusicPosition(playlistId: number, musicId: number, newPosition: number): Promise<any>;
}
