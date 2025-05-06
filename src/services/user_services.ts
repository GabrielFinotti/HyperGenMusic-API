import { UserRepository } from "../repositories";
import { UserData } from "../types";
import { responseUtils, securityUtils } from "../utils";

class UserService {
  constructor(private userRepository: UserRepository) {}

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

      const userDataFinal: UserData = {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        image: userData.image,
        phone: userData.phone,
        role: !userData.role ? "user" : userData.role,
      };

      const newUser = await this.userRepository.createUser(userDataFinal);

      return responseUtils.createSuccessResponse(
        "User registered successfully",
        newUser,
        201
      );
    } catch (error) {
      console.error("Error registering user:", error);

      throw error;
    }
  }

  async userLogin(email: string, password: string) {
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

      const { password: _, ...userWithoutPassword } = user;

      return responseUtils.createSuccessResponse(
        "User logged in successfully",
        userWithoutPassword,
        200
      );
    } catch (error) {
      console.error("Error logging in user:", error);

      throw error;
    }
  }

  async userUpdate(userId: string, userData: Partial<UserData>) {
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

      const userDataUpdate: Partial<UserData> = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        image: userData.image,
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

  async userDelete(userId: string) {
    try {
      const existingUser = await this.userRepository.getUserById(userId);

      if (!existingUser) {
        return responseUtils.createErrorResponse("User not found", 404);
      }

      const deletedUser = await this.userRepository.deleteUser(userId);

      if (!deletedUser) {
        return responseUtils.createErrorResponse("Failed to delete user", 500);
      }

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
}

export default UserService;
