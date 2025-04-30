import { User } from "../../models";

export interface IUserRepository {
  getAllUser(): Promise<User[] | null>;
  getUserById(userId: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByTerm(term: string): Promise<User[] | null>;
  createUser(data: any): Promise<User>;
  updateUser(userId: string, data: any): Promise<User>;
  deleteUser(userId: string): Promise<boolean>;
}
