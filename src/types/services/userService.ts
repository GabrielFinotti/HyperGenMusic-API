import { DefaultResponseResult } from "../handling/defaultReponse";
import { UserInterface } from "../user/userInterface";

export interface UserService {
  register(userData: UserInterface): Promise<DefaultResponseResult>;
  login(email: string, password: string): Promise<DefaultResponseResult>;
  getUserById(id: number): Promise<DefaultResponseResult>;
  updateUser(
    id: number,
    userData: Partial<UserInterface>
  ): Promise<DefaultResponseResult>;
  deleteUser(id: number, authHeader: string): Promise<DefaultResponseResult>;
}
