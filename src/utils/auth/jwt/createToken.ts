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
    console.error(`Generate login token failed! Error: ${error}`.red.bgBlack);

    return { error: "Generate login token failed!" };
  }
};
