import { Request, Response } from "express";
import User from "../../models/userModel";
import bcrypt from "bcrypt";
import { UserInterface } from "../../interfaces/userInterface";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;

    if (!userData.email || !userData.password) {
      return res
        .status(400)
        .json({ error: "Email and password are required!" });
    }

    const getProfile = await User.findOne({
      where: { email: userData.email },
      attributes: ["password", "email", "role"],
    });

    if (!getProfile) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isValidPassword = await bcrypt.compare(
      userData.password,
      getProfile.getDataValue("password")
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password!" });
    }

    return res.status(200).json({
      message: "User logged in successfully!",
      Profile: [{ email: getProfile.email }, { role: getProfile.role }],
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
