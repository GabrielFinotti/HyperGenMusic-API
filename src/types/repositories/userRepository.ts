import User from "../../models/userModel";
import { UserInterface } from "../user/userInterface";

export interface IUserRepository {
  findById: (userId: number) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  findByUsername: (username: string) => Promise<User | null>;
  findByUsernameOrEmail: (
    username: string,
    email: string
  ) => Promise<User | null>;
  findByTerms: (
    searchTerms: string[],
    limit?: number,
    offset?: number
  ) => Promise<User[]>;
  findAll: (limit?: number, offset?: number) => Promise<User[]>;
  create: (userData: UserInterface) => Promise<User>;
  update: (user: User, userData: Partial<UserInterface>) => Promise<User | string>;
  delete: (user: User) => Promise<boolean>;
  deleteAll: () => Promise<number>;
}
