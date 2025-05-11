import { User } from "../models";
import { UserRepository } from "../repositories";
import {
  IUserRepository,
  ResponseError,
  ResponseSuccess,
  UserAttributes,
  UserData,
  UserService,
} from "../types";
import { responseUtils, securityUtils } from "../utils";

class UserServiceImpl implements UserService {
  constructor(private userRepository: IUserRepository = UserRepository) {}

  async userRegister(userData: UserData) {
    try {
      const validationData = securityUtils.verifyUserData(userData, false);

      if (validationData.length > 0) {
        return responseUtils.createErrorResponse(
          `Invalid user data, ${validationData}`,
          400
        );
      }

      const existingUser = await this.userRepository.getUserByEmail(
        userData.email
      );

      if (existingUser) {
        return responseUtils.createErrorResponse("User already exists", 409);
      }

      const hashedPassword = await securityUtils.hashPassword(
        userData.password
      );

      const userDataFinal: Partial<UserAttributes> = {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: !userData.role ? "user" : userData.role,
      };

      await this.userRepository.createUser(userDataFinal);

      return responseUtils.createSuccessResponse(
        "User registered successfully",
        null,
        201
      );
    } catch (error) {
      console.error("Error registering user:", error);

      throw error;
    }
  }

  async userLogin(email: string, password: string, isLong: boolean = false) {
    try {
      const user = await this.userRepository.getUserIncludingPassword(email);

      if (!user) {
        return responseUtils.createErrorResponse("User not found", 404);
      }

      const isPasswordValid = await securityUtils.comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return responseUtils.createErrorResponse("Invalid password", 401);
      }

      const userFormatted: Partial<User> = {
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
        phone: user.phone,
        role: user.role,
      };

      const token = securityUtils.createToken(user.id, isLong);

      if (!token) {
        throw new Error("Failed to create token");
      }

      return responseUtils.createSuccessResponse(
        "User logged in successfully",
        [userFormatted, { token }],
        200
      );
    } catch (error) {
      console.error("Error logging in user:", error);

      throw error;
    }
  }

  async userUpdate(userId: number, userData: Partial<UserData>) {
    try {
      const validationData = securityUtils.verifyUserData(userData, true);

      if (validationData.length > 0) {
        return responseUtils.createErrorResponse(
          `Invalid user data, ${validationData}`,
          400
        );
      }

      const existingUser = await this.userRepository.getUserById(userId);

      if (!existingUser) {
        return responseUtils.createErrorResponse("User not found", 404);
      }

      const userDataUpdate: Partial<UserAttributes> = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        imageUrl: "",
        phone: userData.phone,
        role: userData.role,
      };

      if (userData.password) {
        userDataUpdate.password = await securityUtils.hashPassword(
          userData.password
        );
      }

      const updatedUser = await this.userRepository.updateUser(
        userId,
        userDataUpdate
      );

      return responseUtils.createSuccessResponse(
        "User updated successfully",
        updatedUser,
        200
      );
    } catch (error) {
      console.error("Error updating user:", error);

      throw error;
    }
  }

  async userDelete(userId: number) {
    try {
      const existingUser = await this.userRepository.getUserById(userId);

      if (!existingUser) {
        return responseUtils.createErrorResponse("User not found", 404);
      }

      await this.userRepository.deleteUser(userId);

      return responseUtils.createSuccessResponse(
        "User deleted successfully",
        null,
        200
      );
    } catch (error) {
      console.error("Error deleting user:", error);

      throw error;
    }
  }

  async getProfileData(userId: number) {
    try {
      const user = await this.userRepository.getUserById(userId);

      if (!user) {
        return responseUtils.createErrorResponse("User not found", 404);
      }

      return responseUtils.createSuccessResponse(
        "User profile retrieved successfully",
        user,
        200
      );
    } catch (error) {
      console.error("Error getting user profile:", error);

      throw error;
    }
  }
}

export default new UserServiceImpl();
