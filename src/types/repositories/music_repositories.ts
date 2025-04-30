import { Music } from "../../models";

export interface IMusicRepository {
  getAllMusic(): Promise<Music[] | null>;
  getMusicById(musicId: string): Promise<Music | null>;
  getMusicByTerm(term: string): Promise<Music[] | null>;
  createMusic(music: any): Promise<Music>;
  updateMusic(musicId: string, data: any): Promise<Music>;
  deleteMusic(musicId: string): Promise<boolean>;
}
