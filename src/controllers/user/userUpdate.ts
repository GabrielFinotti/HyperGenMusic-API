import { Request, Response } from "express";
import User from "../../models/userModel";
import { UserInterface } from "../../interfaces/userInterface";
import { authUtils, userUtils } from "../../utils";

export const userUpdate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body as Partial<UserInterface>;

    const validatedUserData =
      authUtils.userAuth.updateDataVerification(userData);

    if (Array.isArray(validatedUserData)) {
      return res.status(400).json({ errors: validatedUserData });
    }

    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        include: validatedUserData.password ? ["password"] : [],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const result = await userUtils.userDataUpdate(validatedUserData, user);

    if ("error" in result) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
