import { User } from "../../models";
import { ResponseError, ResponseSuccess, UserData } from "../interfaces";

export interface UserService {
  userRegister(
    userData: UserData
  ): Promise<ResponseError | ResponseSuccess<User>>;
  userLogin(
    email: string,
    password: string
  ): Promise<ResponseError | ResponseSuccess<({token: string} | Partial<User>)[]>>;
  userUpdate(
    userId: number,
    userData: Partial<UserData>
  ): Promise<ResponseError | ResponseSuccess<User>>;
  userDelete(userId: number): Promise<ResponseError | ResponseSuccess<null>>;
}
