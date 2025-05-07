import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { constants } from "../../../utils";

dotenv.config();

const createToken = (userId: string, isLong: boolean) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY as string, {
    expiresIn: isLong
      ? constants.authTokenTemp.MAX_TEMP
      : constants.authTokenTemp.MIN_TEMP,
  });
};

export default createToken;
