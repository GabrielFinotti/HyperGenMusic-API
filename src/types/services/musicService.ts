import { DefaultResponseResult } from "../handling/defaultReponse";

export interface MusicService {
  getAllMusic(limit?: number, offset?: number): Promise<DefaultResponseResult>;
  getMusicData(id: number): Promise<DefaultResponseResult>;
  searchMusics(
    query: string,
    limit?: number,
    offset?: number
  ): Promise<DefaultResponseResult>;
}
