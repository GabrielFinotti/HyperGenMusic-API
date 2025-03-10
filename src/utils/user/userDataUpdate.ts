import { UserInterface } from "../../interfaces/userInterface";
import User from "../../models/userModel";
import { userUtils } from "..";

export const userDataUpdate = async (
  userDataUpdate: Partial<UserInterface>,
  user: User
) => {
  try {
    if (userDataUpdate.email || userDataUpdate.username) {
      const existingUser = await userUtils.getUserData(
        undefined,
        userDataUpdate.email,
        userDataUpdate.username
      );

      if (existingUser && existingUser.id !== user.id) {
        return { error: "User with this email or username already exists" };
      }
    }

    if (userDataUpdate.password) {
      // Usando o método comparePassword do modelo
      const hasChangePassword = await user.comparePassword(
        userDataUpdate.password
      );

      if (hasChangePassword) {
        delete userDataUpdate.password;
      }
    }

    let hasChanges = false;

    (Object.keys(userDataUpdate) as Array<keyof UserInterface>).forEach(
      (key) => {
        const newValue = userDataUpdate[key];
        const currentValue = user.get(key);

        if (newValue !== undefined && newValue !== currentValue) {
          user.set(key, newValue);
          hasChanges = true;
        }
      }
    );

    if (!hasChanges) {
      return { message: "No changes to update" };
    }

    await user.save();

    return { message: "User data updated successfully" };
  } catch (error) {
    console.error(`Error at userDataUpdate:`, error);
    return { error: "Failed to update user data" };
  }
};
