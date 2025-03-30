import { Request, Response } from "express";
import { musicService } from "../../services";

const getAllMusics = async (req: Request, res: Response) => {
  try {
    const result = await musicService.getAllMusic();

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro interno ao recuperar músicas: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao recuperar músicas!",
    });
  }
};

export default getAllMusics;
