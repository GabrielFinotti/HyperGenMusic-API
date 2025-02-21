import { Request, Response } from "express";
import User from "../../models/userModel";
import { UserInterface } from "../../interfaces/userInterface";
import { updateDataVerification } from "../../utils/auth/userAuth/updateDataVerification";
import { userDataUpdate } from "../../utils/user/userDataUpdate";

export const userUpdate = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body as UserInterface;
    let user!: User | null;

    const confirmUserData = updateDataVerification(userData);

    if (confirmUserData instanceof Array) {
      return res.status(400).json({ errors: confirmUserData });
    }

    if (confirmUserData.password) {
      user = await User.findOne({
        where: { id: userId },
        attributes: { include: ["password"] },
      });
    } else {
      user = await User.findOne({
        where: { id: userId },
      });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const info = await userDataUpdate(confirmUserData, user);

    if (info.error) {
      return res.status(400).json({ error: info.error });
    } else {
      return res.status(200).json({ message: info.message });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
