import { Music } from "../../models";
import { LikedMusicData, ResponseError, ResponseSuccess } from "../interfaces";

export interface LikedMusicService {
  getLikedMusicsByUserId(
    userId: number
  ): Promise<ResponseError | ResponseSuccess<Music[]>>;

  checkIfUserLikedMusic(
    likedMusicData: LikedMusicData
  ): Promise<ResponseError | ResponseSuccess<boolean>>;

  likeMusic(
    likedMusicData: LikedMusicData
  ): Promise<ResponseError | ResponseSuccess<boolean>>;

  unlikeMusic(
    likedMusicData: LikedMusicData
  ): Promise<ResponseError | ResponseSuccess<boolean>>;
}
