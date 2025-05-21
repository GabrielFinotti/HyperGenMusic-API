import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL as string);

redisClient.on("connect", () => {
  console.log("Redis Client Connected".green.bgBlack);
});

redisClient.on("error", (err) => {
  console.error(`Redis Client Error: ${err}`.red.bgBlack);
});

export default redisClient;
