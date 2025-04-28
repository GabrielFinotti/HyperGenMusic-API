export interface IMusicRepository {
  getAllMusic(): Promise<any>;
  getMusicById(musicId: string): Promise<any>;
  getMusicByTerm(term: string): Promise<any>;
  createMusic(music: any): Promise<any>;
  updateMusic(musicId: string, music: any): Promise<any>;
  deleteMusic(musicId: string): Promise<any>;
}
