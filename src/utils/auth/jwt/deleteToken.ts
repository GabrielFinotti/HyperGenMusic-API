import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisClient from "../../../config/redis/redisConfig";

dotenv.config();

export const deleteToken = async (token: string) => {
  try {
    const tokenString = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const payload = jwt.verify(tokenString, process.env.SECRET_KEY as string);

    if (payload && typeof payload === "object") {
      const exp = payload.exp as number;
      const now = Math.floor(Date.now() / 1000);

      if (exp > now) {
        const ttl = exp - now;

        await redisClient.set(`blacklist:${tokenString}`, "1", "EX", ttl);
        console.log(
          `Token revogado e adicionado à lista negra por ${ttl} segundos!`
            .yellow.bgBlack
        );
      }

      return { message: "token invalidado com sucesso!" };
    }

    return { error: "Token inválido!" };
  } catch (error) {
    console.error(`Erro ao revogar token: ${error}!`.red.bgBlack);

    return { error: "Falha ao invalidar token!" };
  }
};
