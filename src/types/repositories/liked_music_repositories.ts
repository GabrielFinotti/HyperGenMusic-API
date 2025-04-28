export interface ILikedMusicRepository {
  likeMusic(userId: number, musicId: number): Promise<any>;
  unlikeMusic(userId: number, musicId: number): Promise<any>;
  getLikedMusicsByUserId(userId: number): Promise<any>;
  checkIfUserLikedMusic(userId: number, musicId: number): Promise<any>;
}
