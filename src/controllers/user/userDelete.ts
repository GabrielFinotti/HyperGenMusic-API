import { Request, Response } from "express";
import { getUserData } from "../../utils/user/getUserData";

export const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const userData = await getUserData(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found!" });
    }

    await userData.destroy();

    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error(`Error deleting user: ${error}`.red.bgBlack);

    return res.status(500).json({ message: "Internal server error!" });
  }
};
