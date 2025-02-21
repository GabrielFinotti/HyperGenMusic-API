import { Request, Response } from "express";
import { Op } from "sequelize";
import { UserInterface } from "./../../interfaces/userInterface";
import User from "../../models/userModel";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const missingConditions: string[] = [];
    let errors: string[] = [];

    if (userData.username.trim() !== userData.username) {
      errors.push("Username cannot start or end with whitespace!");
    }
    if (userData.password.trim() !== userData.password) {
      errors.push("Password cannot start or end with whitespace!");
    }

    if (userData.username.length < 6 || userData.username.length > 12) {
      errors.push("Username must be between 6 and 12 characters!");
    }
    if (userData.password.length < 8 || userData.password.length > 20) {
      errors.push("Password must be between 8 and 20 characters!");
    }

    if (!uppercaseRegex.test(userData.password)) {
      missingConditions.push("an uppercase letter!");
    }
    if (!numberRegex.test(userData.password)) {
      missingConditions.push("a number");
    }
    if (!specialCharRegex.test(userData.password)) {
      missingConditions.push("a special character!");
    }

    if (missingConditions.length > 0) {
      errors.push(
        `Password must contain at least ${missingConditions.join(", ")}!`
      );
    }

    if (userData.email.trim() !== userData.email) {
      errors.push("Email cannot start or end with whitespace!");
    }
    if (!emailRegex.test(userData.email)) {
      errors.push("Invalid email format!");
    }

    if (!userData.role) {
      userData.role = "user";
    }

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: userData.email }, { username: userData.username }],
      },
    });

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
