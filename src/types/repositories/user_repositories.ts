export interface IUserRepository {
  getAllUser(): Promise<any>;
  getUserById(userId: string): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  getUserByTerm(term: string): Promise<any>;
  createUser(user: any): Promise<any>;
  updateUser(userId: string, user: any): Promise<any>;
  deleteUser(userId: string): Promise<any>;
}
