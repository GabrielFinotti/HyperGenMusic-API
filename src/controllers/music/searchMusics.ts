import { Request, Response } from "express";
import { musicService } from "../../services";

const searchMusics = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;

    const result = await musicService.searchMusics(query, limit);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro interno ao buscar músicas: ${
        error instanceof Error ? error.message : String(error)
      }`
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao buscar músicas",
    });
  }
};

export default searchMusics;
