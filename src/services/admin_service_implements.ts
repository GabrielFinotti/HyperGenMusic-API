import { MusicRepository, UserRepository } from "../repositories";
import {
  AdminService,
  IMusicRepository,
  IUserRepository,
  MusicData,
} from "../types";
import { responseUtils, securityUtils } from "../utils";

class AdminServiceImpl implements AdminService {
  constructor(
    private userRepository: IUserRepository = UserRepository,
    private musicRepository: IMusicRepository = MusicRepository
  ) {}

  async getAllUsers(limit: number, offset: number) {
    try {
      if (isNaN(limit) || isNaN(offset)) {
        return responseUtils.createErrorResponse(
          "Limit and offset must be numbers",
          400
        );
      }

      const users = await this.userRepository.getAllUsers(limit, offset);

      if (!users) {
        return responseUtils.createErrorResponse("No users found", 404);
      }

      return responseUtils.createSuccessResponse(
        `${users.length} users found`,
        users,
        200
      );
    } catch (error) {
      console.error("Error fetching all users:", error);

      return responseUtils.createErrorResponse("Internal server error", 500);
    }
  }

  async getUserByTerm(term: string, limit: number, offset: number) {
    try {
      if (isNaN(limit) || isNaN(offset)) {
        return responseUtils.createErrorResponse(
          "Limit and offset must be numbers",
          400
        );
      }

      const users = await this.userRepository.getUserByTerm(
        term,
        limit,
        offset
      );

      if (!users) {
        return responseUtils.createErrorResponse("No users found", 404);
      }

      return responseUtils.createSuccessResponse(
        `${users.length} users found`,
        users,
        200
      );
    } catch (error) {
      console.error("Error fetching user by term:", error);

      return responseUtils.createErrorResponse("Internal server error", 500);
    }
  }

  async deleteAllUsers() {
    try {
      const result = await this.userRepository.deleteAllUsers();

      return responseUtils.createSuccessResponse(
        `${result} users deleted`,
        null,
        200
      );
    } catch (error) {
      console.error("Error deleting all users:", error);

      return responseUtils.createErrorResponse("Internal server error", 500);
    }
  }

  async createMusic(musicData: MusicData) {
    try {
      const validationData = securityUtils.verifyMusicData(musicData, false);

      if (validationData.length > 0) {
        return responseUtils.createErrorResponse(
          `Invalid Music Data: ${validationData}`,
          400
        );
      }

      await this.musicRepository.createMusic(musicData);

      return responseUtils.createSuccessResponse(
        "Music created successfully",
        null,
        201
      );
    } catch (error) {
      console.error("Error creating music:", error);

      return responseUtils.createErrorResponse("Internal server error", 500);
    }
  }

  async updateMusic(musicId: number, musicData: Partial<MusicData>) {
    try {
      const existingMusic = await this.musicRepository.getMusicById(musicId);

      if (!existingMusic) {
        return responseUtils.createErrorResponse("Music not found", 404);
      }

      const validationData = securityUtils.verifyMusicData(musicData, true);

      if (validationData.length > 0) {
        return responseUtils.createErrorResponse(
          `Invalid Music Data: ${validationData}`,
          400
        );
      }

      const music = await this.musicRepository.updateMusic(musicId, musicData);

      return responseUtils.createSuccessResponse(
        "Music updated successfully",
        music,
        200
      );
    } catch (error) {
      console.error("Error updating music:", error);

      return responseUtils.createErrorResponse("Internal server error", 500);
    }
  }

  async deleteMusic(musicId: number) {
    try {
      const existingMusic = await this.musicRepository.getMusicById(musicId);

      if (!existingMusic) {
        return responseUtils.createErrorResponse("Music not found", 404);
      }

      await this.musicRepository.deleteMusic(musicId);

      return responseUtils.createSuccessResponse(
        "Music deleted successfully",
        null,
        204
      );
    } catch (error) {
      console.error("Error deleting music:", error);

      return responseUtils.createErrorResponse("Internal server error", 500);
    }
  }

  async deleteAllMusic() {
    try {
      const result = await this.musicRepository.deleteAllMusic();

      return responseUtils.createSuccessResponse(
        `${result} music deleted`,
        null,
        200
      );
    } catch (error) {
      console.error("Error deleting all music:", error);

      return responseUtils.createErrorResponse("Internal server error", 500);
    }
  }
}

export default new AdminServiceImpl();
