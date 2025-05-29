import { LikedMusics, Music } from "../../models";
import { LikedMusicData } from "../interfaces";

export interface ILikedMusicRepository {
  likeMusic(data: LikedMusicData): Promise<LikedMusics>;

  unlikeMusic(data: LikedMusicData): Promise<boolean>;

  getLikedMusicsByUserId(userId: number): Promise<Music[] | null>;

  checkIfUserLikedMusic(data: LikedMusicData): Promise<boolean>;
}
