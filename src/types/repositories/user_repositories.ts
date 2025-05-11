import { User } from "../../models";
import { UserAttributes } from "../models";

export interface IUserRepository {
  getAllUser(): Promise<User[] | null>;
  getUserById(userId: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserIncludingPassword(email: string): Promise<User | null>;
  getUserByTerm(term: string): Promise<User[] | null>;
  createUser(data: Partial<UserAttributes>): Promise<void>;
  updateUser(userId: number, data: Partial<UserAttributes>): Promise<User>;
  deleteUser(userId: number): Promise<void>;
}
