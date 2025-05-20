import { Music } from "../../models";
import { MusicAttributes } from "../models";

export interface IMusicRepository {
  getAllMusic(limit: number, offset: number): Promise<Music[] | null>;
  getMusicById(musicId: number): Promise<Music | null>;
  getMusicByTerm(
    term: string,
    limit: number,
    offset: number
  ): Promise<Music[] | null>;
  getMusicByGenre(
    genre: string,
    limit: number,
    offset: number
  ): Promise<Music[] | null>;
  createMusic(music: Partial<MusicAttributes>): Promise<void>;
  updateMusic(musicId: number, data: Partial<MusicAttributes>): Promise<Music>;
  deleteMusic(musicId: number): Promise<void>;
  deleteAllMusic(): Promise<number>;
}
