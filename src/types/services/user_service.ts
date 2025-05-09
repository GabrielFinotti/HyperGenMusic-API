import { User } from "../../models";
import { ResponseError, ResponseSuccess, UserData } from "../interfaces";

export interface UserService {
  userRegister(
    userData: UserData
  ): Promise<ResponseError | ResponseSuccess<User>>;
  userLogin(
    email: string,
    password: string
  ): Promise<ResponseError | ResponseSuccess<Partial<User>>>;
  userUpdate(
    userId: string,
    userData: Partial<UserData>
  ): Promise<ResponseError | ResponseSuccess<User>>;
  userDelete(userId: string): Promise<ResponseError | ResponseSuccess<null>>;
}
