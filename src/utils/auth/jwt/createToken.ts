import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (userId: number) => {
  try {
    const payload = { userId };

    return jwt.sign(payload, process.env.SECRET_KEY as string, {
      expiresIn: "30d",
    });
  } catch (error) {
    console.error(`Falha ao gerar token de login! Erro: ${error}`.red.bgBlack);

    return { error: "Falha ao gerar token de login!" };
  }
};
