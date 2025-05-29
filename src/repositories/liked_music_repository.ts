import { LikedMusics, Music, User } from "../models";
import { ILikedMusicRepository } from "../types";
import { LikedMusicData } from "../types";

class LikedMusicRepository implements ILikedMusicRepository {
  async getLikedMusicsByUserId(userId: number) {
    try {
      const likedMusics = await User.findByPk(userId, {
        include: [
          {
            model: Music,
            as: "likedMusics",
          },
        ],
        attributes: [],
      });

      return likedMusics?.likedMusics ? likedMusics.likedMusics : null;
    } catch (error) {
      throw error;
    }
  }

  async checkIfUserLikedMusic(likedMusicData: LikedMusicData) {
    try {
      const likedMusic = await LikedMusics.findOne({
        where: {
          userId: likedMusicData.userId,
          musicId: likedMusicData.musicId,
        },
      });

      return likedMusic !== null;
    } catch (error) {
      throw error;
    }
  }

  async likeMusic(likedMusicData: LikedMusicData) {
    try {
      const likedMusic = await LikedMusics.create(likedMusicData);

      return likedMusic;
    } catch (error) {
      throw error;
    }
  }

  async unlikeMusic(likedMusicData: LikedMusicData) {
    try {
      const result = await LikedMusics.destroy({
        where: {
          userId: likedMusicData.userId,
          musicId: likedMusicData.musicId,
        },
      });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default new LikedMusicRepository();
