import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { IUser } from '@domain/user/entities/user.entity';

// Esses são alguns dos atributos opcionais na criação do usuário
type UserCreationAttributes = Optional<
  IUser,
  | 'id'
  | 'likedMusics'
  | 'musicsMostPlayed'
  | 'musicsMostPlayedByGenre'
  | 'countPlayedMusics'
  | 'totalTimePlayed'
  | 'genresMostPlayed'
  | 'createdAt'
  | 'updatedAt'
>;

export class UserModel
  extends Model<IUser, UserCreationAttributes>
  implements IUser
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public avatar!: URL;
  public role!: 'admin' | 'user';

  public likedMusics!: {
    count: number;
    musics: number[];
  };
  public musicsMostPlayed!: number[];
  public musicsMostPlayedByGenre!: [{ genre: string; musicId: number[] }];
  public countPlayedMusics!: number;
  public totalTimePlayed!: number;
  public genresMostPlayed!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(12),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'https://example.com/avatar.png',
        },
        role: {
          type: DataTypes.ENUM('admin', 'user'),
          allowNull: false,
          defaultValue: 'user',
        },
        likedMusics: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: {
            count: 0,
            musics: [],
          },
        },
        musicsMostPlayed: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
        musicsMostPlayedByGenre: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
        countPlayedMusics: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        totalTimePlayed: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        genresMostPlayed: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        indexes: [
          {
            fields: ['email'],
            unique: true,
          },
        ],
      },
    );
  }
}
