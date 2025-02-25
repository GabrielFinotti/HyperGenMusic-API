import { Request, Response } from "express";
import { getUserData } from "../../utils/user/getUserData";

export const userData = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const userData = await getUserData(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(userData.dataValues);
  } catch (error) {
    console.error(`Error while getting user data: ${error}`.red.bgBlack);

    return res.status(500).json({ message: "Internal server error!" });
  }
};
