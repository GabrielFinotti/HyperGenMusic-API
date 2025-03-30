import { Request, Response } from "express";
import { userService } from "../../services";

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro durante o processo de login: ${
        error instanceof Error ? error.message : String(error)
      }!`
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro durante o processo de login",
    });
  }
};

export default userLogin;
