import redisClient from "../../config/database/redis_config";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const revokeToken = async (token: string) => {
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY as string);

    if (typeof decode === "string") {
      throw new Error("Invalid token");
    }

    const expirationTime = (decode.exp as number) * 1000;
    const currentTime = Date.now();
    const remainingTime = Math.floor((expirationTime - currentTime) / 1000);

    if (remainingTime > 0) {
      await redisClient.set(
        `Blacklisted:${token}`,
        "revoked",
        "EX",
        remainingTime
      );
    }
  } catch (error) {
    throw error;
  }
};

export default revokeToken;
