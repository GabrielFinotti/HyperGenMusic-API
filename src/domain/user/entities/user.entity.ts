export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: URL;
  role: 'admin' | 'user';
  likedMusics: {
    count: number;
    musics: number[];
  };
  musicsMostPlayed: number[];
  musicsMostPlayedByGenre: [
    {
      genre: string;
      musicId: number[];
    },
  ];
  countPlayedMusics: number;
  totalTimePlayed: number;
  genresMostPlayed: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class User implements Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {
  declare name: string;
  declare email: string;
  declare password: string;
  declare avatar: URL;
  declare role: 'admin' | 'user';
  declare likedMusics: {
    count: number;
    musics: number[];
  };
  declare musicsMostPlayed: number[];
  declare musicsMostPlayedByGenre: [
    {
      genre: string;
      musicId: number[];
    },
  ];
  declare countPlayedMusics: number;
  declare totalTimePlayed: number;
  declare genresMostPlayed: string[];

  constructor(props: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.avatar = props.avatar;
    this.role = props.role;
    this.likedMusics = {
      count: props.likedMusics.count,
      musics: props.likedMusics.musics,
    };
    this.musicsMostPlayed = props.musicsMostPlayed;
    this.musicsMostPlayedByGenre = props.musicsMostPlayedByGenre;
    this.countPlayedMusics = props.countPlayedMusics;
    this.totalTimePlayed = props.totalTimePlayed;
    this.genresMostPlayed = props.genresMostPlayed;
  }
}
