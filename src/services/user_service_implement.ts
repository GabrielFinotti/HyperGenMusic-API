import { User } from "../models";
import { UserRepository } from "../repositories";
import {
  IUserRepository,
  UserAttributes,
  UserData,
  UserService,
} from "../types";
import { responseUtils, securityUtils, storageUtils } from "../utils";

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

      const userDataFinal: Partial<UserAttributes> = userData;
      userDataFinal.password = hashedPassword;

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
      for (const key in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, key)) {
          const typedKey = key as keyof UserData;

          if (userData[typedKey] === "") {
            userData[typedKey] = undefined;
          }
        }
      }

      Object.keys(userData).forEach((key) => {
        const typedKey = key as keyof UserData;

        if (userData[typedKey] === undefined) {
          delete userData[typedKey];
        }
      });

      if (Object.keys(userData).length === 0) {
        return responseUtils.createErrorResponse(
          "No data provided for update",
          400
        );
      }

      const validationData = securityUtils.verifyUserData(userData, true);

      if (validationData.length > 0) {
        return responseUtils.createErrorResponse(
          `Invalid user data, ${validationData}`,
          400
        );
      }

      let existingUser: User | null = null;

      if (userData.password) {
        existingUser = await this.userRepository.getUserIncludingPassword(
          undefined,
          userId
        );
      } else {
        existingUser = await this.userRepository.getUserById(userId);
      }

      if (!existingUser) {
        return responseUtils.createErrorResponse("User not found", 404);
      }

      let userDataUpdate: Partial<UserAttributes> = {};

      if (userData.email && userData.email !== existingUser.email) {
        const emailExists = await this.userRepository.getUserByEmail(
          userData.email
        );

        if (emailExists) {
          return responseUtils.createErrorResponse("Email already exists", 409);
        }

        userDataUpdate.email = userData.email;
      }

      if (userData.username && userData.username !== existingUser.username) {
        userDataUpdate.username = userData.username;
      }

      if (userData.password) {
        if (
          !(await securityUtils.comparePassword(
            userData.password,
            existingUser.password
          ))
        ) {
          userDataUpdate.password = await securityUtils.hashPassword(
            userData.password
          );
        }
      }

      if (userData.phone && userData.phone !== existingUser.phone) {
        userDataUpdate.phone = userData.phone;
      }

      if (userData.imageUrl && existingUser.imageUrl) {
        await storageUtils.deleteArchiveForBucket(existingUser.imageUrl);

        userDataUpdate.imageUrl = userData.imageUrl;
      } else {
        userDataUpdate.imageUrl = userData.imageUrl;
      }

      if (Object.keys(userDataUpdate).length === 0) {
        return responseUtils.createErrorResponse(
          "Data provided for update is the same as existing data",
          400
        );
      }

      await this.userRepository.updateUser(userId, userDataUpdate);

      const userUpdateFormatted = await this.userRepository.getUserById(userId);

      return responseUtils.createSuccessResponse(
        "User updated successfully",
        userUpdateFormatted,
        200
      );
    } catch (error) {
      console.error("Error updating user:", error);

      if (userData.imageUrl) {
        await storageUtils.deleteArchiveForBucket(userData.imageUrl);
      }

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
