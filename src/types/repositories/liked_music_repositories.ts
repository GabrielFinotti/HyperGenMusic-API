import { LikedMusics, Music } from "../../models";

export interface ILikedMusicRepository {
  likeMusic(userId: number, musicId: number): Promise<LikedMusics>;
  unlikeMusic(userId: number, musicId: number): Promise<boolean>;
  getLikedMusicsByUserId(userId: number): Promise<Music[] | null>;
  checkIfUserLikedMusic(userId: number, musicId: number): Promise<boolean>;
}
