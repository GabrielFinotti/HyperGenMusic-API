import redisClient from "../../../config/database/redis_config";
import jwt from "jsonwebtoken";

const revogueToken = async (token: string) => {
  try {
    const decoded = jwt.decode(token);
    // if (!decoded || !decoded.exp) {
    //   throw new Error("Token inválido ou sem expiração.");
    // }

    // const now = Math.floor(Date.now() / 1000);

    // const expiresIn = decoded.exp - now;

    // if (expiresIn > 0) {
    //   await redisClient.set(`blacklist:${token}`, "revoked", "EX", expiresIn);
    // }
  } catch (error) {
    throw error;
  }
};

export default revogueToken;
