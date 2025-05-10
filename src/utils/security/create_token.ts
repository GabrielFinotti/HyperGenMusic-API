import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { constants } from "..";

dotenv.config();

const createToken = (userId: number, isLong: boolean) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY as string, {
    expiresIn: isLong
      ? constants.authTokenTemp.MAX_TEMP
      : constants.authTokenTemp.MIN_TEMP,
  });
};

export default createToken;
