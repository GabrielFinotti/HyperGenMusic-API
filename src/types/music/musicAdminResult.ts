import { MusicDataResult } from "./musicInterface";

export interface InsertMusicResult {
  success: boolean;
  music?: MusicDataResult;
  error?: string;
  statusCode: number;
}

export interface UpdateMusicResult extends InsertMusicResult {}
