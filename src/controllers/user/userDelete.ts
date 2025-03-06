import { Request, Response } from "express";
import { getUserData } from "../../utils/user/getUserData";
import { deleteToken } from "../../utils/auth/jwt/deleteToken";

export const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const authHeader = req.headers.authorization;

    const userData = await getUserData(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const revogeToken = await deleteToken(authHeader);

    if (revogeToken.error) {
      return res
        .status(400)
        .json({ message: `Error deleting user: ${revogeToken.error}` });
    }

    await userData.destroy();

    return res
      .status(200)
      .json({ message: `User deleted successfully, ${revogeToken.message}!` });
  } catch (error) {
    console.error(`Error deleting user: ${error}`.red.bgBlack);

    return res.status(500).json({ message: "Internal server error!" });
  }
};
