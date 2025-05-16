import { MusicRepository } from "../repositories";
import { IMusicRepository, MusicService } from "../types";
import { responseUtils } from "../utils";

class MusicServiceImpl implements MusicService {
  constructor(private musicRepository: IMusicRepository = MusicRepository) {}

  async getAllMusic(limit: number, offset: number) {
    try {
      const musics = await this.musicRepository.getAllMusic(limit, offset);

      if (!musics) {
        return responseUtils.createErrorResponse("No music found.", 404);
      }

      return responseUtils.createSuccessResponse(
        "All music fetched successfully.",
        musics,
        200
      );
    } catch (error) {
      console.error("Error fetching all music:", error);

      return responseUtils.createErrorResponse(
        "An error occurred while fetching all music.",
        500
      );
    }
  }

  async getMusicByTerm(term: string, limit: number, offset: number) {
    try {
      const musics = await this.musicRepository.getMusicByTerm(
        term,
        limit,
        offset
      );

      if (!musics) {
        return responseUtils.createErrorResponse(
          "No music found matching the term.",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Music fetched successfully by term.",
        musics,
        200
      );
    } catch (error) {
      console.error("Error fetching music by term:", error);

      return responseUtils.createErrorResponse(
        "An error occurred while fetching music by term.",
        500
      );
    }
  }

  async getMusicByGenre(genre: string, limit: number, offset: number) {
    try {
      const musics = await this.musicRepository.getMusicByGenre(
        genre,
        limit,
        offset
      );

      if (!musics) {
        return responseUtils.createErrorResponse(
          "No music found for the specified genre.",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Music fetched successfully by genre.",
        musics,
        200
      );
    } catch (error) {
      console.error("Error fetching music by genre:", error);

      return responseUtils.createErrorResponse(
        "An error occurred while fetching music by genre.",
        500
      );
    }
  }

  async getMusicData(musicId: number) {
    try {
      const music = await this.musicRepository.getMusicById(musicId);

      if (!music) {
        return responseUtils.createErrorResponse("No music found.", 404);
      }

      return responseUtils.createSuccessResponse(
        "Music fetched successfully.",
        music,
        200
      );
    } catch (error) {
      console.error("Error fetching music data:", error);

      return responseUtils.createErrorResponse(
        "An error occurred while fetching music data.",
        500
      );
    }
  }
}

export default new MusicServiceImpl();
