import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL as string);

redisClient.on("connect", () => {
  console.log("Cliente Redis conectado".green.bgBlack);
});

redisClient.on("error", (err) => {
  console.error(`Erro no cliente Redis: ${err}`.red.bgBlack);
});

export default redisClient;
