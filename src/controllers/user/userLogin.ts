import { Request, Response } from "express";
import User from "../../models/userModel";
import bcrypt from "bcrypt";
import { UserInterface } from "../../interfaces/userInterface";
import { generateToken } from "../../utils/auth/jwt/createToken";

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
      attributes: ["password", "id"],
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

    const token = await generateToken(getProfile.getDataValue("id"));

    if (typeof token !== "string") {
      return res.status(500).json({ error: "Generate login token failed!" });
    }

    return res.status(200).json({
      message: "User logged in successfully!",
      token,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
