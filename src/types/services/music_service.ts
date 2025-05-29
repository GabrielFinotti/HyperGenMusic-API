import { Music } from "../../models";
import { ResponseError, ResponseSuccess } from "../interfaces";

export interface MusicService {
  getAllMusics(
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<Music[]>>;

  getMusicByTerm(
    term: string,
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<Music[]>>;

  getMusicByGenre(
    genre: string,
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<Music[]>>;

  getMusicData(
    musicId: number
  ): Promise<ResponseError | ResponseSuccess<Music>>;
}
