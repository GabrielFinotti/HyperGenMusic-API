import { Request, Response } from "express";
import { userService } from "../../services";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);

    res
      .status(result.statusCode)
      .json(
        result.success
          ? { message: result.message, token: result.token }
          : { error: result.message }
      );
  } catch (error) {
    console.error("Erro durante o login:", error);

    res.sendStatus(500);
  }
};
