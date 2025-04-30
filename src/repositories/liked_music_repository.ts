import { LikedMusics, Music, User } from "../models";
import { ILikedMusicRepository } from "../types";

class LikedMusicRepository implements ILikedMusicRepository {
  async likeMusic(userId: number, musicId: number) {
    try {
      const likedMusic = await LikedMusics.create({
        userId,
        musicId,
      });

      return likedMusic;
    } catch (error) {
      throw error;
    }
  }

  async unlikeMusic(userId: number, musicId: number) {
    try {
      const result = await LikedMusics.destroy({
        where: { userId, musicId },
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

  async checkIfUserLikedMusic(userId: number, musicId: number) {
    try {
      const likedMusic = await LikedMusics.findOne({
        where: { userId, musicId },
      });

      return likedMusic !== null;
    } catch (error) {
      throw error;
    }
  }
}

export default LikedMusicRepository;
