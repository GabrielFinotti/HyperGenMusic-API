import { Music, User } from "../../models";
import { MusicData, ResponseError, ResponseSuccess } from "../interfaces";

export interface AdminService {
  getAllUsers(
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<User[]>>;
  getUserByTerm(
    term: string,
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<User[]>>;
  deleteAllUsers(): Promise<ResponseError | ResponseSuccess<null>>;
  createMusic(
    musicData: MusicData
  ): Promise<ResponseError | ResponseSuccess<null>>;
  updateMusic(
    musicId: number,
    musicData: Partial<MusicData>
  ): Promise<ResponseError | ResponseSuccess<Music>>;
  deleteMusic(musicId: number): Promise<ResponseError | ResponseSuccess<null>>;
  deleteAllMusic(): Promise<ResponseError | ResponseSuccess<null>>;
}
