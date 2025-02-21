import { Request, Response } from "express";
import { UserInterface } from "../../interfaces/userInterface";
import User from "../../models/userModel";
import { userDataVerification } from "../../utils/auth/userAuth/dataVerification";
import { getUserData } from "../../utils/user/getUserData";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;

    const confirmUserData = userDataVerification(userData);

    if (confirmUserData instanceof Array) {
      return res.status(400).json({ errors: confirmUserData });
    }

    const existingUser = await getUserData(
      undefined,
      userData.email,
      userData.username
    );

    if (existingUser) {
      return res
        .status(409)
        .json({ errors: ["Username or email already exists!"] });
    }

    await User.create(userData);

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(`Error registering user, ${error}!`.red.bgBlack);

    return res.sendStatus(500);
  }
};
