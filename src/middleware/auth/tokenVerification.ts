import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import redisClient from "../../config/redis/redisConfig";

dotenv.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Acesso negado!" });
      return;
    }

    const isRevoked = await redisClient.get(`blacklist:${token}`);

    if (isRevoked) {
      res.status(403).json({ error: "Token foi revogado!" });
      return;
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (error, payload) => {
      if (error) {
        res.status(403).json({ error: "Token não é válido!" });
        return;
      }

      if (payload && typeof payload === "object") {
        req.params.id = payload.userId;
        next();
      }
    });
  } catch (error) {
    console.error(
      `Erro ao tentar autenticar token: ${error}!`.red.bgBlack
    );

    res.status(500).json({ error: "Erro do servidor!" });
  }
};
