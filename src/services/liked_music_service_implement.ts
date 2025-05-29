import { LikedMusicRepository } from "../repositories";
import {
  ILikedMusicRepository,
  LikedMusicData,
  LikedMusicService,
} from "../types";
import { responseUtils } from "../utils";

class LikedMusicServiceImpl implements LikedMusicService {
  constructor(
    private likedMusicRepository: ILikedMusicRepository = LikedMusicRepository
  ) {}

  async getLikedMusicsByUserId(userId: number) {
    try {
      if (isNaN(userId)) {
        return responseUtils.createErrorResponse("Invalid user ID", 400);
      }

      const likedMusics =
        await this.likedMusicRepository.getLikedMusicsByUserId(userId);

      if (!likedMusics) {
        return responseUtils.createErrorResponse(
          "No liked musics found for this user",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Liked musics retrieved successfully",
        likedMusics,
        200
      );
    } catch (error) {
      console.error("Error retrieving liked musics by user ID:", error);

      return responseUtils.createErrorResponse(
        "Failed to retrieve liked musics",
        500
      );
    }
  }

  async checkIfUserLikedMusic(likedMusicData: LikedMusicData) {
    try {
      const isLiked = await this.likedMusicRepository.checkIfUserLikedMusic(
        likedMusicData
      );

      return responseUtils.createSuccessResponse(
        "Check if user liked music",
        isLiked,
        200
      );
    } catch (error) {
      console.error("Error checking if user liked music:", error);

      return responseUtils.createErrorResponse(
        "Failed to check if user liked music",
        500
      );
    }
  }

  async likeMusic(likedMusicData: LikedMusicData) {
    try {
      const result = await this.likedMusicRepository.likeMusic(likedMusicData);

      return responseUtils.createSuccessResponse(
        "Music liked successfully",
        result !== null,
        200
      );
    } catch (error) {
      console.error("Error liking music:", error);

      return responseUtils.createErrorResponse("Failed to like music", 500);
    }
  }

  async unlikeMusic(likedMusicData: LikedMusicData) {
    try {
      const result = await this.likedMusicRepository.unlikeMusic(
        likedMusicData
      );

      return responseUtils.createSuccessResponse(
        "Music unliked successfully",
        result,
        200
      );
    } catch (error) {
      console.error("Error unliking music:", error);

      return responseUtils.createErrorResponse("Failed to unlike music", 500);
    }
  }
}

export default new LikedMusicServiceImpl();
