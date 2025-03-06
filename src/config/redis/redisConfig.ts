import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL as string);

redisClient.on("connect", () => {
  console.log("Redis client connected".green.bgBlack);
});

redisClient.on("error", (err) => {
  console.error(`Redis client error: ${err}`.red.bgBlack);
});

export default redisClient;
