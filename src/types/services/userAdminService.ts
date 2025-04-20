import { DefaultResponseResult } from "../handling/defaultReponse";
import { UserInterface } from "../user/userInterface";

export interface UserAdminService {
  getAllUsers(limit?: number, offset?: number): Promise<DefaultResponseResult>;
  getUserData(userId: number): Promise<DefaultResponseResult>;
  searchUser(
    query: string,
    limit?: number,
    offset?: number
  ): Promise<DefaultResponseResult>;
  createUser(userData: UserInterface): Promise<DefaultResponseResult>;
  editUser(
    userId: number,
    userData: Partial<UserInterface>
  ): Promise<DefaultResponseResult>;
  deleteUser(userId: number): Promise<DefaultResponseResult>;
  deleteAllUsers(): Promise<DefaultResponseResult>;
}
