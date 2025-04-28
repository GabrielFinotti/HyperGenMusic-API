import Music from "../../models/Music";
import { MusicInterface } from "../music/musicInterface";

export interface IMusicRepository {
  findById: (musicId: number) => Promise<Music | null>;
  findByTerms: (
    searchTerms: string[],
    limit?: number,
    offset?: number
  ) => Promise<Music[]>;
  findAll: (limit?: number, offset?: number) => Promise<Music[]>;
  create: (musicData: MusicInterface) => Promise<Music>;
  update: (
    music: Music,
    musicData: Partial<MusicInterface>
  ) => Promise<Music | string>;
  delete: (music: Music) => Promise<boolean>;
  deleteAll: () => Promise<number>;
}
