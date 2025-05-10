import { Music } from "../../models";
import { MusicAttributes } from "../models";

export interface IMusicRepository {
  getAllMusic(): Promise<Music[] | null>;
  getMusicById(musicId: number): Promise<Music | null>;
  getMusicByTerm(term: string): Promise<Music[] | null>;
  createMusic(music: Partial<MusicAttributes>): Promise<Music>;
  updateMusic(musicId: number, data: Partial<MusicAttributes>): Promise<Music>;
  deleteMusic(musicId: number): Promise<boolean>;
}
