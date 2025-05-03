import { User } from "../../models";
import { UserData } from "../interfaces";

export interface IUserRepository {
  getAllUser(): Promise<User[] | null>;
  getUserById(userId: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByTerm(term: string): Promise<User[] | null>;
  createUser(data: UserData): Promise<User>;
  updateUser(userId: string, data: Partial<UserData>): Promise<User>;
  deleteUser(userId: string): Promise<boolean>;
}
