import { LikedMusics, Music, User } from "../models";
import { ILikedMusicRepository } from "../types";
import { LikedMusicData } from "../types";

class LikedMusicRepository implements ILikedMusicRepository {
  async likeMusic(data: LikedMusicData) {
    try {
      const likedMusic = await LikedMusics.create(data);

      return likedMusic;
    } catch (error) {
      throw error;
    }
  }

  async unlikeMusic(data: LikedMusicData) {
    try {
      const result = await LikedMusics.destroy({
        where: { userId: data.userId, musicId: data.musicId },
      });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }

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

  async checkIfUserLikedMusic(data: LikedMusicData) {
    try {
      const likedMusic = await LikedMusics.findOne({
        where: { userId: data.userId, musicId: data.musicId },
      });

      return likedMusic !== null;
    } catch (error) {
      throw error;
    }
  }
}

export default new LikedMusicRepository();
