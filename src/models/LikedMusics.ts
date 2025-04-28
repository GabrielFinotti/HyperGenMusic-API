import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database/databaseConfig";
import User from "./User";
import Music from "./Music";

interface LikedMusicsAttributes {
  userId: number;
  musicId: number;
  likedAt: Date;
}

class LikedMusics
  extends Model<LikedMusicsAttributes>
  implements LikedMusicsAttributes
{
  declare userId: number;
  declare musicId: number;
  declare likedAt: Date;
}

LikedMusics.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    musicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Music,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    likedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "liked_musics",
    timestamps: false,
    indexes: [{ fields: ["userId"] }, { fields: ["musicId"] }],
  }
);

export default LikedMusics;
