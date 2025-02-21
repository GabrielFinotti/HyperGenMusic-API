import { UserInterface } from "../../interfaces/userInterface";
import User from "../../models/userModel";
import { getUserData } from "./getUserData";

export const userDataUpdate = async (
  userDataUpdate: Partial<UserInterface>,
  user: User
) => {
  try {
    const userAttributes = user.dataValues;

    const existingUser = await getUserData(
      undefined,
      userDataUpdate.email,
      userDataUpdate.username
    );

    if (existingUser) {
      if (existingUser.id !== user.id) {
        return { error: "User with this email or username already exists" };
      }
    }

    for (const key of Object.keys(userDataUpdate) as Array<
      keyof UserInterface
    >) {
      if (
        (userDataUpdate as any)[key] !== undefined &&
        (userDataUpdate as any)[key] !== userAttributes[key]
      ) {
        user.setDataValue(key, (userDataUpdate as any)[key]);
      }
    }

    await user.save();

    return { message: "User data updated successfully" };
  } catch (error) {
    console.error(`Error at userDataUpdate: ${error}`.red.bgBlack);

    throw error;
  }
};
