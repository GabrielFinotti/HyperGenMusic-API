export interface MusicInterface {
  title: string;
  songUrl: string;
  duration: number;
  imageUrl?: string;
  artist?: string;
  genre?: string;
}

export interface MusicDataResult {
  id: number;
  title: string;
  songUrl: string;
  imageUrl?: string;
  artist?: string;
  genre?: string;
  duration: number;
  formattedDuration: string;
  isLong: boolean;
}
